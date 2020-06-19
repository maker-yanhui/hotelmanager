layui.use(['layer','table','form','laydate','laypage','element','jquery'], function() {
    var layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate,
        laypage=layui.laypage,
        $=layui.jquery,
        element=layui.element;
    var page=1;
    var limit=3;
    var count=0;

    var roomTypeNameIf=false;
    var delRoomTypeif=false
    //初始化第一页的数据
    loadRoomType();
    //初始化分页
    loadPage();
    $("#saveRoomTypeBtn").click(function () {
        layer.open({
            type: 1,
            title: "房间类型的添加界面",
            area: ['400px', '320px'],
            anim: 3,
            shade: 0.6,
            content: $("#saveRoomTypeDiv"),
        })
        form.on('submit(demo3)',function (data) {
            saveRoomType(data.field);
            layer.closeAll();
            return false;
        })
    })

    //删除和更新按钮
    $("#collapseDiv").on('click','button',function () {
        if ($(this).attr("event")=="del"){
            var roomTypeId=$(this).val();
                //检验是否房间类型是否有房屋
                verifyRoomType(roomTypeId);
                if (delRoomTypeif){
                    //询问是否删除
                    layer.confirm("真的删除此客房类型吗？",function (index) {
                        //执行删除
                        delRoomType(roomTypeId);
                        layer.close(index);
                    })
                }else {
                    layer.msg("此房间类型下有房间，不能删除",{icon: 2,time:2000,anim: 6,shade:0.5})
                }
        }else {
            layer.open({
                type: 1,
                title: "房间类型的修改界面",
                area: ['400px', '320px'],
                anim: 3,
                shade: 0.6,
                content: $("#updRoomTypeDiv"),
            })
            var str=$(this).val();
            var attr=str.split(",");
            form.val('updRoomTypeFromFilter',{
                "id":attr[0],
                "roomTypeName":attr[1],
                "roomPrice":attr[2]
            })
        }
    })
    //修改提交监听
    form.on('submit(demo4)',function (data) {
        updRoomType(data.field);
        layer.closeAll();
        return false;
    })
    form.verify({
        roomTypeName: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length < 3 || value.length > 8) {
                return '客房类型名称必须为3-8位';
            }
            checkroomTypeName(value);  //验证客房类型名称的唯一性
            if(!roomTypeNameIf){
                return '此客房类型名称已被占用';
            }
        },
        roomPrice:function (value, item) {
            if(value<100||value>1000){
                return '房间价格在100-1000之间';
            }
        }
    })
    //监听折叠
    element.on('collapse(test)', function(data){
        if(data.show){
            var roomTypeId=$(this).attr("roomTypeId")
            loadRoom(roomTypeId);
        }
    });
    //完整功能
   function loadPage() {
       laypage.render({
           elem: 'test1'
           ,count: count
           ,limit:limit
           ,limits:[3,5,10]
           ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
           ,jump: function(obj,first){
               if(!first){  //首次不执行
                   limit = obj.limit;   //将每一页的数据条数赋值给全局变量的每一页数据条数
                   page = obj.curr;   //将分页的页码赋值给全局变量当前页
                   loadRoomType();
               }
           }
       });
   }
    //初始化数据
    function loadRoomType() {
        $.ajax({
            type:"post",
            url:"/roomType/showPageByPramas",
            async:false,
            data:{
                "page":page,
                "limit":limit
            },
            success:function (data) {
                count=data.count;
                var roomTypeStr = '';
                $.each(data.data,function (i,roomType) {
                    roomTypeStr += '<div class="layui-colla-item" style="margin-top: 10px;">';
                    roomTypeStr += '<button type="button" class="layui-btn layui-btn-sm layui-btn-danger" event="del" value="'+roomType.id+'" style="float: right;">删除</button>';
                    roomTypeStr += '<button type="button" class="layui-btn layui-btn-sm layui-btn-warm" event="upd" value="'+roomType.id+','+roomType.roomTypeName+','+roomType.roomPrice+'" style="float: right;">修改</button>';
                    roomTypeStr += '<h2 class="layui-colla-title" roomTypeId="'+roomType.id+'">'+roomType.roomTypeName+'--'+roomType.roomPrice+'元/天'+'</h2>';
                    roomTypeStr += '<div class="layui-colla-content">';
                    roomTypeStr += '<p id="p'+roomType.id+'"></p>';
                    roomTypeStr += '</div>';
                    roomTypeStr += '</div>';
                })
                $("#collapseDiv").html(roomTypeStr);
                //将面板渲染
                element.render('collapse');
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
    //验证房间名类型的唯一性
    function  checkroomTypeName(value) {
        $.ajax({
            type:"post",
            url:"/roomType/showCountByPramas",
            async:false,
            data:{
                "roomTypeName":value
            },
            success:function (data) {
                if(data>0){
                    roomTypeNameIf=false;
                }else {
                    roomTypeNameIf=true;
                }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
    //添加房间类型
    function saveRoomType(jsonRoomType) {
        $.ajax({
            type:"post",
            url:"/roomType/add",
            data:jsonRoomType,
            success:function (data) {
                if(data=="success"){
                    layer.msg("添加成功",{icon: 1,time:2000,anim: 6,shade:0.5})
                    page=1;
                    loadRoomType();
                    loadPage();
                }else {
                    layer.msg("添加失败",{icon: 2,time:2000,anim: 6,shade:0.5})
                }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
    //面板展开内容
    function loadRoom(roomTypeId) {
        $.ajax({
            type:"post",
            url:"/rooms/showAllByPramas",
            data:{
                "roomTypeId":roomTypeId
            },
            success:function (data) {
                var roomStr = '<ul class="site-doc-icon site-doc-anim">';
                $.each(data,function (i,item) {
                    //添加客房li标签的背景色
                    if(item.roomStatus=='0'){
                        roomStr += '<li style="background-color: #009688;">';
                    }else if(item.roomStatus=='1'){
                        roomStr += '<li style="background-color: red;">';
                    }else {
                        roomStr += '<li style="background-color: blueviolet;">';
                    }
                    roomStr += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                    roomStr += '<div class="code">';
                    roomStr += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                    roomStr += '</div>';
                    roomStr += '</li>';
                });
                roomStr += '</ul>';
                //将ul中的客房数据标签填充到对应的p标签中
                $("#p"+roomTypeId).html(roomStr);
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
    function verifyRoomType(roomTypeId) {
        $.ajax({
            type:"post",
            url:"/rooms/showCountByPramas",
            async:false,
            data:{
                "roomTypeId":roomTypeId
            },
            success:function (data) {
                if(data>0){
                    delRoomTypeif=false;
                }else {
                    delRoomTypeif=true;
                }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
    //删除房间类型
    function delRoomType(roomTypeId) {
        $.ajax({
            type:"post",
            url:"/roomType/scByPrimaryKey",
            data:{
                "id":roomTypeId
            },
            success:function (data) {
                if(data=="success"){
                    layer.msg("删除成功",{icon: 1,time:2000,anim: 6,shade:0.5})
                    loadRoomType();
                    loadPage();
                }else {
                    layer.msg("删除失败",{icon: 2,time:2000,anim: 6,shade:0.5})
                }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
    //更新房间类型
    function updRoomType(jsonRoomType) {
        $.ajax({
            type:"post",
            url:"/roomType/xgByPrimaryKey",
            data:jsonRoomType,
            success:function (data) {
                if(data=="success"){
                    layer.msg("修改成功",{icon: 1,time:2000,anim: 6,shade:0.5})
                    loadRoomType();
                }else {
                    layer.msg("修改失败",{icon: 2,time:2000,anim: 6,shade:0.5})
                }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
})