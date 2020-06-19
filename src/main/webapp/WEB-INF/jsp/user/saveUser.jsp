<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>vip添加页面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="/lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="/lib/layui/layui.js"></script>
    <style type="text/css">
        .layui-form-item{
            margin-top: 32px;
        }

    </style>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title">
    <legend>用户添加</legend>
</fieldset>
<form class="layui-form layui-form-pane" action="">
    <div class="layui-form-item">
        <label class="layui-form-label">用户名：</label>
        <div class="layui-input-inline" style="width: 300px;">
            <input type="text" name="username" id="username" lay-verify="required|username" placeholder="请输入用户名" autocomplete="off" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">密码：</label>
            <div class="layui-input-inline" style="width: 300px;">
                <input type="password" name="pwd" id="pwd" lay-verify="required|psw" placeholder="请输入密码" autocomplete="off" class="layui-input">
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">再输入密码：</label>
        <div class="layui-input-inline" style="width: 300px;">
            <input type="password"  name="pwd"  placeholder="请再次输入密码" lay-verify="required|verifypsw" autocomplete="off" class="layui-input" >
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">创建时间：</label>
        <div class="layui-input-inline" style="width: 300px;">
            <input type="text" id="createDate" name="createDate" autocomplete="off" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">用户角色：</label>
        <div class="layui-input-inline" style="width: 300px;">
            <select id="role" name="role" lay-filter="role" lay-verify="required">
            </select>
        </div>
    </div>
    <div class="layui-form-item" style="margin-left: 100px;margin-top: 40px;">
        <button class="layui-btn" lay-submit="" lay-filter="demo2">确认添加</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>
</form>
</body>
<script src="/js/user/saveUser.js"></script>
</html>