 layui.use(['jquery','layer','table','form','laydate','upload'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate,
        upload = layui.upload;
    loadAllRoomType();
    //初始化所有房间
     loadAllRooms();
    var roomif=true
    $("#saveRoomsUI").click(function () {
        layer.open({
            type:1,  //弹框类型
            title:"客房信息添加界面", //弹框标题
            area:['400px','500px'],  //弹框的宽高度
            anim: 4,  //弹框弹出时的动画效果
            shade:0.5,  //背景的透明度
            content:$("#saveRoomsDiv")  //弹出的内容
        })
    })
    form.verify({
        roomNum:function (value, item) {
            if (value.length!=4){
               return "房间号必须为4位数";
            }
            //检查房间号的唯一性
            checkRoomNum(value);
            if (!roomif){
                return "房间号已经存在";
            }
        }
    })
    form.on('submit(demo3)',function (data) {
        var jsonRoom=data.field;
            jsonRoom["roomStatus"]=0;
            jsonRoom["flag"]=1;
            saveRooms(jsonRoom);
            layer.closeAll();
            return false;
    })

    //图片中的删除和空闲修改
    $("ul").on('click','button',function () {
        if ($(this).val()=='del'){
           var roomid=$(this).attr('roomid');
           //删除操作
            delRoom(roomid);
        }else {
            var roomid=$(this).attr('roomid');
            //更新操作
            updRoom(roomid);
        }
    })
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        ,url: '/rooms/upload' //改成您自己的上传接口
        ,field:'field'
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){
            //如果上传失败
            if(res.code > 0){
                return layer.msg('上传失败');
            }
            //上传成功
            layer.msg('上传成功');
            $("#roomPicId").val(res.newFileName);
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });
     //加载所有房间
     function loadAllRooms() {
         $.ajax({
             type:"post",
             url:"/rooms/findAll",
             success:function (data) {
                 var roomStatus0 = '';
                 var roomStatus1 = '';
                 var roomStatus2 = '';
                 $.each(data,function (i,item) {
                     //根据客房状态分别显示不同状态的客房信息
                     if(item.roomStatus=='0'){  //空闲的
                         roomStatus0 += '<li style="background-color: #009688;">';
                         roomStatus0 += '<img class="layui-anim" id="demo1" src='+item.roomPic+' width="135px" height="135px"/>';
                         roomStatus0 += '<div class="code">';
                         roomStatus0 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                         roomStatus0 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                         roomStatus0 += '</div>';
                         roomStatus0 += '</li>';
                     }else if(item.roomStatus=='1'){ //已入住
                         roomStatus1 += '<li style="background-color: red;">';
                         roomStatus1 += '<img class="layui-anim" id="demo1" src='+item.roomPic+' width="135px" height="135px"/>';
                         roomStatus1 += '<div class="code">';
                         roomStatus1 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                         roomStatus1 += '</div>';
                         roomStatus1 += '</li>';
                     }else {   //打扫
                         roomStatus2 += '<li style="background-color: blueviolet;">';
                         roomStatus2 += '<img class="layui-anim" id="demo1" src='+item.roomPic+' width="135px" height="135px"/>';
                         roomStatus2 += '<div class="code">';
                         roomStatus2 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                         roomStatus2 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                         roomStatus2 += '<button type="button" value="upd" roomid="'+item.id+'" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                         roomStatus2 += '</div>';
                         roomStatus2 += '</li>';
                     }
                 })
                 //将数据标签填充到ul列表容器中
                 $("ul").eq(0).html(roomStatus0);
                 $("ul").eq(1).html(roomStatus1);
                 $("ul").eq(2).html(roomStatus2);
             },
             error:function () {
                 layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
             }
         })
     }
     function loadAllRoomType() {
         $.ajax({
             type:"post",
             url:"/roomType/findAll",
             success:function (data) {
                 var roomTypeStr='<option selected value="">请选择房间类型</option>'
                 $.each(data,function (i, temp) {
                     roomTypeStr+='<option value="'+temp.id+'">'+temp.roomTypeName+'</option>'
                 })
                 $("#selRoomType").html(roomTypeStr);
                 form.render('select');
             },
             error:function () {
                 layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
             }
         })
     }

    function checkRoomNum(roomNum) {
        $.ajax({
            type:"post",
            url:"/rooms/showCountByPramas",
            async:false,
            data:{
                "roomNum":roomNum
            },
            success:function (data) {
                if (data>0){
                    roomif=false;
                }else {
                    roomif=true;
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }

    function saveRooms(jsonRoom) {
        $.ajax({
            type:"post",
            url:"/rooms/add",
            async:false,
            data:jsonRoom,
            success:function (data) {
             if(data=="success"){
                 layer.msg('房间添加成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                 loadAllRooms();
             }else {
                 layer.msg('房间添加失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
             }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }
    function delRoom(roomid){
    $.ajax({
        type:"post",
        url:"/rooms/xgByPrimaryKeySelective",
        data:{
            "id":roomid,
            "flag":0
        },
        success:function (data) {
            if (data=="success"){
                layer.msg('房间删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                loadAllRooms();
            }else {
                layer.msg('房间删除失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
            }
        },
        error:function () {
            layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
        }
    })
}
    function updRoom(roomid) {
        $.ajax({
            type:"post",
            url:"/rooms/xgByPrimaryKeySelective",
            data:{
                "id":roomid,
                "roomStatus":0
            },
            success:function (data) {
                if (data=="success"){
                    layer.msg('房间空闲成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRooms();
                }else {
                    layer.msg('房间空闲失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }
});