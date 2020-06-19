layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;
        var idcardif=false;
        var phoneif=false;
    //身份证号验证
    $("#idcard").blur(function () {
        //开启验证
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test($(this).val())){  //正则表达式的验证
            checkedIdcard($(this).val());
        }else {
            layer.tips('身份证号格式错误', $("#idcard"), {tips: [2,'#fc1505'],time:2000,});
        }

    });

    //手机号验证
    $("#phone").blur(function () {
        //开启验证
        var reg = /^1[3456789]\d{9}$/;
        if(reg.test($(this).val())){  //正则验证
            checkedPhone($(this).val());
        }else {
            layer.tips('手机号格式不正确！！', $("#phone"), {tips: [2,'#fc1505'],time:2000,});
        }

    });
    form.on('select(vipRate)',function (data) {
        var date=new Date();
        $("#createDate").val(getNowDate(date));
        if(data.value==0.8){
          var vipNum=dateReplace(getNowDate(date))+"01";
          $("#vipNum").val(vipNum);
        }else {
            var vipNum=dateReplace(getNowDate(date))+"02";
            $("#vipNum").val(vipNum);
        }
    })

    form.on('submit(demo2)',function (data) {
        if (idcardif&&phoneif){
            saveVip(data.field);
        }else if (!idcardif&&phoneif){
            layer.msg('身份证号已被使用！！', {icon: 2,time:2000,anim: 6,shade:0.5});
        }else if (idcardif&&!phoneif){
            layer.msg('手机号已被使用！！', {icon: 2,time:2000,anim: 6,shade:0.5});
        }
        return false;
    })
    function checkedIdcard(idcard) {
        $.ajax({
            type:"post",
            url:"/vip/showCountByPramas",
            data:{
                "idcard":idcard
            },
            success:function (data) {
                if (data>0){
                    idcardif=false;
                    layer.tips('身份证号已使用！！', $("#idcard"), {tips: [2,'#fc1505'],time:2000,});
                }else {
                    idcardif=true;
                    layer.tips('身份证号可用。。', $("#idcard"), {tips: [2,'green'],time:2000,});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }
    function checkedPhone(phone) {
        $.ajax({
            type:"post",
            url:"/vip/showCountByPramas",
            data:{
                "phone":phone
            },
            success:function (data) {
                if (data>0){
                    phoneif=false;
                    layer.tips('手机号已使用！！', $("#phone"), {tips: [2,'#fc1505'],time:2000,});
                }else {
                    phoneif=true;
                    layer.tips('手机号可用。。', $("#phone"), {tips: [2,'green'],time:2000,});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }

    function saveVip(vip) {
        $.ajax({
            type:"post",
            url:"/vip/add",
            data:vip,
            success:function (data) {
                if (data=="success"){
                    layer.msg('会员信息添加成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    //用定时器完成系统的路径跳转
                    setTimeout('window.location = "/model/toShowVip"',2000);
                }else {
                    layer.msg('会员信息添加失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }

    //获取当前时间字符串     Date()   ---->  yyyy/MM/dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }
});