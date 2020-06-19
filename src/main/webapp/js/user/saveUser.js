layui.use(['layer','table','form','laydate','jquery'], function() {
    var $=layui.jquery,
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;
    //对于验证用户名唯一的标记
    var usernameif=false;
    //初始加载所有的角色
    loadAllRole();
    //定义创建时间
    laydate.render({
        elem: '#createDate'
        ,type: 'datetime'
        ,format:"yyyy/MM/dd HH:mm:ss"
        ,value:new Date()
    });
    form.on('submit(demo2)',function (data) {
        var attr=data.field.role.split(",");
        var jsonUser=data.field;
        delete jsonUser["role"];
        jsonUser["roleId"]=attr[0];
        jsonUser["isAdmin"]=attr[1];
        jsonUser["useStatus"]="1";
        saveUser(jsonUser);

       return false;
    })
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if(value.length<4&&value.length>9){
                return'用户名长度不能小于4和大于9位';
            }
            //验证用户名的唯一性
            verifyUserName(value);
            if (!usernameif){
                return'用户名已经存在';
            }
        }
        ,psw: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        verifypsw:function (value,item) {
            if (value!=$("#pwd").val()){
                return "与密码不一致";
            }
        }
    })
    function loadAllRole() {
        $.ajax({
            type:"post",
            url:"/roles/findAll",
            success:function (data) {
                var str='<option value="">--请选择角色--</option>'
                $.each(data,function (i, temp) {
                    str+='<option value="'+temp.id+','+temp.roleName+'">'+temp.roleName+'</option>'
                })
                $("#role").html(str);
                form.render('select');
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
    function verifyUserName(value) {
        $.ajax({
            type:"post",
            url:"/user/showCountByPramas",
            async:false,
            data:{
                "username":value
            },
            success:function (data) {
               if (data>0){
                   usernameif=false;
               }else {
                   usernameif=true;
               }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
    function saveUser(jsonUser){
        $.ajax({
            type:"post",
            url:"/user/add",
            data:jsonUser,
            success:function (data) {
                if (data=="success"){
                    layer.msg("用户添加成功",{icon: 1,time:2000,anim: 6,shade:0.5})
                    setTimeout('window.location="/model/toSaveUser"',2000);
                }else {
                    layer.msg("用户添加失败",{icon: 2,time:2000,anim: 6,shade:0.5})
                }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
})