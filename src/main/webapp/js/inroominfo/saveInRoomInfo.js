layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    loadRooms(0);//初始化房间

    //日期时间选择器,显示入住时间
    laydate.render({
        elem: '#create_date'  //日期插件加入的容器
        ,type: 'datetime'  //日期类型
        ,format:'yyyy/MM/dd HH:mm:ss'  //显示日期的格式
        ,min:0
        ,value:new Date()//值为当前时间
        ,trigger: 'click'
    });
    form.on('radio(isVip)', function(data){
        //console.log(data.elem); //得到radio原始DOM对象
        if (data.value==1){
            isVip();

        }else {
            noVip();
            $("form").eq(0).find("input:text").val("");
        }

    });

    function isVip() {
        $("#vip_num").removeAttr("disabled");
        $("#customerName").attr("disabled", "disabled");
        $("#gender1").attr("disabled", "disabled");
        $("#gender0").attr("disabled", "disabled");
        $("#idcard").attr("disabled", "disabled");
        $("#phone").attr("disabled", "disabled");
        $("#vip_num").attr("lay-verify","required|number|vip_num");
    }
    function noVip() {
        $("#vip_num").attr("disabled","disabled");
        $("#customerName").removeAttr("disabled","disabled");
        $("#gender1").removeAttr("disabled","disabled");
        $("#gender0").removeAttr("disabled","disabled");
        $("#idcard").removeAttr("disabled","disabled");
        $("#phone").removeAttr("disabled","disabled");
        $("#vip_num").removeAttr("lay-verify","required|number|vip_num");
    }

    //输入会员卡号时，查询会员数据
    $("#vip_num").blur(function () {
        var vipNum = $(this).val();
        //验证
        if(vipNum.length==16){
            layer.tips('会员卡号正确。。', this, {tips: [2,'green'],time:2000,});
            //发送请求查询会员数据
            loadVipByVipNum(vipNum);
        }else {
            layer.tips('会员卡号为16位！！', this, {tips: [2,'#fc1505'],time:2000,});//在文本框输入后不满足住条件就在文本框傍边提示
        }
    });

    //添加入住信息监听
    form.on('submit(demo1)',function (data) {
        // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        //  console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
        //  console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}、
        var jsonInRoomInfo=data.field;
        jsonInRoomInfo["status"]=1;
        jsonInRoomInfo["outRoomStatus"]=0;
        savaInRoomInfo(jsonInRoomInfo);
        layer.closeAll();  //关闭所有弹框
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })
    //自定义表单验证
    form.verify({
        vip_num: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length != 16 ) {
                return '会员卡号为16位';
            }
        }
    });
    function loadRooms(num) {
        $.ajax({
            type:"post",
            url:"/rooms/showAllByPramas",
            data:{
                "roomStatus":num
            },
            success:function (data) {
                var str="<option selected value=''>请选择房间</option>"
                $.each(data,function (i, temp) {
                    str+="<option value="+temp.id+">"+temp.roomNum+"-"+temp.roomType.roomTypeName+"-"+temp.roomType.roomPrice+"</option>"
                })
                $("#selRoomNumId").html(str);
                form.render('select');
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }

    //加载会员，并显示数据
    function loadVipByVipNum(vipNum) {
        $.ajax({
            type:"post",
            url:"/vip/showByPramas",
            data:{
                "vipNum":vipNum
            },
            success:function (data) {
                form.val("example", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                    "customerName": data.customerName // "name": "value"
                    ,"gender": data.gender
                    ,"idcard": data.idcard
                    ,"phone": data.phone
                });
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }

    function savaInRoomInfo(jsonInRoomInfo) {
        $.ajax({
            type:"post",
            url:"/inRoomInfo/add",
            data:jsonInRoomInfo,
            success:function (data) {
               if (data==="success"){
                   layer.msg('入住成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                   setTimeout('window.location = "/model/toShowInRoomInfo"',2000);
               }else {
                   layer.msg('入住失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
               }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
});
