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
        <legend>订单信息显示</legend>
    </fieldset>
    <!--查询的表单-->
    <form class="layui-form" action="" lay-filter="example" style="margin-top: 20px;">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">订单编号</label>
                <div class="layui-input-inline">
                    <input type="text" name="orderNum" autocomplete="off" class="layui-input" placeholder="请输入订单编号">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">时间范围</label>
                <div class="layui-input-inline" style="width: 380px;">
                    <input type="text" class="layui-input" id="test3" placeholder="选则时间范围" name="queryTimes">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">订单状态</label>
                <div class="layui-input-block">
                    <select name="orderStatus">
                        <option value="" selected>--全部--</option>
                        <option value="1">已支付</option>
                        <option value="0">未支付</option>
                    </select>
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button class="layui-btn" lay-submit="" lay-filter="demo1"><i class="layui-icon">&#xe615;</i>查询</button>
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button type="button" class="layui-btn layui-btn-danger" id="batchBtn"><i class="layui-icon">&#xe640;</i>批量删除</button>
                </div>
            </div>
        </div>
    </form>
    <!--入住信息数据显示的容器-->
    <table id="demo" lay-filter="test"></table>
</div>
</body>
<script src="/js/orders/showOrders.js"></script>
<script type="text/html" id="barDemo">
    {{#  if(d.orderStatus == 1){ }}
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    {{#  } else { }}
    <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="exitroom"><i class="layui-icon">&#xe605;</i>支付</a>
    {{#  } }}

</script>
<script type="text/html" id="isVipTpl">
    {{#  if(d.inRoomInfo.isVip == 1){ }}
    <font color="red">是</font>
    {{#  } else { }}
    <font color="blue">否</font>
    {{#  } }}
</script>
<script type="text/html" id="orderStatusTpl">
    {{#  if(d.orderStatus == 1){ }}
    <font color="red">已结算</font>
    {{#  } else { }}
    <font color="blue">未结算</font>
    {{#  } }}
</script>

</html>
