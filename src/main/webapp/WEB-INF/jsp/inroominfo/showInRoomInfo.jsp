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
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
        .layui-table td img{
            width:60px;
            height: 60px;
        }
    </style>
</head>
<body>
<div align="center">
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>入住信息显示</legend>
    </fieldset>
    <!--入住信息数据显示的容器-->
    <table id="demo" lay-filter="test"></table>
    <jsp:include page="exitRooms.jsp"/>
</div>
</body>
<script src="/js/inroominfo/showInRoomInfo.js"></script>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="edit"><i class="layui-icon">&#xe642;</i>修改</a>
    {{#  if(d.outRoomStatus == 1){ }}
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    {{#  } else { }}
    <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="exitroom"><i class="layui-icon">&#xe605;</i>退房</a>
    {{#  } }}

</script>
<script type="text/html" id="sex">
    {{#  if(d.gender == 1){ }}
    <font color="blue">男</font>
    {{#  } else { }}
    <font color="#db7093">女</font>
    {{#  } }}
</script>
<script type="text/html" id="vip">
    {{#  if(d.isVip == 1){ }}
    <font color="red">是</font>
    {{#  } else { }}
    <font color="blue">否</font>
    {{#  } }}
</script>
<script type="text/html" id="outRoomStatus">
    {{#  if(d.outRoomStatus == 1){ }}
    <font color="red">已退房</font>
    {{#  } else { }}
    <font color="blue">未退房</font>
    {{#  } }}
</script>

</html>
