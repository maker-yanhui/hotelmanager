<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/2/19
  Time: 10:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="/lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="/lib/layui/layui.js"></script>
</head>
<body>
<div align="center">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>消费信息显示</legend>
    </fieldset>
    <!--查询的表单-->
    <form class="layui-form" action="" lay-filter="example" style="margin-top: 20px;">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">房间编号</label>
                <div class="layui-input-inline">
                    <input type="text" name="roomNum" autocomplete="off" class="layui-input" placeholder="请输入订单编号">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">时间范围</label>
                <div class="layui-input-inline" style="width: 380px;">
                    <input type="text" class="layui-input" id="test3" placeholder="选则时间范围" name="queryTimes">
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button class="layui-btn" lay-submit="" lay-filter="demo1"><i class="layui-icon">&#xe615;</i>查询</button>
                </div>
            </div>
        </div>
    </form>
    <!--入住信息数据显示的容器-->
    <table id="demo" lay-filter="test"></table>
</div>
</body>
<script src="/js/roomSale/showRoomSale.js"></script>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="look"><i class="layui-icon">&#xe615;</i>查看</a>
</script>
</html>

