layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;
    var yzmif=false;
    $("#yzm").blur(function () {
       var yzm=$(this).val();
        checkedyzm(yzm);
    })
    form.on('submit(login)',function (data) {
        if(yzmif){
            verifyUser(data.field);
        }else {
            layer.msg('验证码错误', {icon: 2,time:2000,anim: 5,shade:0.5});
        }
        return false
    })
    function checkedyzm(yzm){
        $.ajax({
            type:"post",
            url:"/user/toVerify",
            async:false,
            data:{
                "yzm":yzm
            },
            success:function (data) {
                if(data=="success"){
                    layer.msg('验证成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    yzmif=true;
                }else {
                    layer.msg('验证失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                    yzmif=false;
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }
    function verifyUser(result) {
        $.ajax({
            type:"post",
            url:"/user/toVerifyNameAndPsw",
            data:{
                "username":result.username,
                "pwd":result.pwd
            },
            success:function (data) {
                if(data!=null&&data!=''){
                    layer.msg('登录成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    setTimeout('window.location="/authority/start"',2000);
                }else {
                    layer.msg('登陆失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }
});