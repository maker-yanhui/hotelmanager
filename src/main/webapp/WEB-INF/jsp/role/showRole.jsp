<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>标题</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="/lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="/lib/layui/layui.js"></script>
    <!--引入ztree相关css和js文件-->
    <link rel="stylesheet" href="/lib/zTree/css/icomoon_styles.css" type="text/css">
    <link rel="stylesheet" href="/lib/zTree/css/metroStyle.css" type="text/css">
    <script type="text/javascript" src="/lib/zTree/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="/lib/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="/lib/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="/lib/zTree/js/jquery.ztree.exedit.js"></script>
</head>
<body>
<div>
    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
        <legend>角色信息管理</legend>
    </fieldset>
    <div align="center">
        <!--权限树形容器-->
        <div id="ztreeDiv" class="content_wrap" style="display: none;">
            <div class="zTreeDemoBackground left">
                <ul id="test1" class="ztree"></ul>
            </div>
        </div>
        <!--订单信息数据显示的容器-->
        <table id="demo" lay-filter="test"></table>
    </div>
</div>
</body>
<!--引入layui的js文件-->
<script src="/js/role/showRole.js"></script>
<!--表格操作模板-->
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="query"><i class="layui-icon">&#xe615;</i>查看</a>
</script>
<!--会员类型-->
<script type="text/html" id="statusTpl">
    {{#  if(d.status ==1){ }}
    <font color="#ff8c00">可用</font>
    {{#  } else { }}
    <font color="#2f4f4f">禁用</font>
    {{#  } }}
</script>
<!--性别-->
<script type="text/html" id="flagTpl">
    {{#  if(d.flag == 1){ }}
    <font color="blue">显示</font>
    {{#  } else { }}
    <font color="#ffc0cb">不显示</font>
    {{#  } }}
</script>

</html>
