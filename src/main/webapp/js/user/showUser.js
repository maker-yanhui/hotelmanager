layui.use(['layer','table','form','laydate'], function() {
    var layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;
    loadVip();
    function loadVip() {
        table.render({
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            , height: 412  //容器高度
            , url: '/user/showPageByPramas' //数据接口或者访问服务器端的数据路径
            , limit: 3   //自定义每一页的数据条数
            , limits: [2, 3, 5, 8, 10]
            , even: true  //逐行背景色深浅不一
            , page: true //开启分页
            , cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type: 'checkbox'}
                , {field: 'id', title: 'ID', align: 'center', width: 120, sort: true}
                , {field: 'username', title: '用户名字', align: 'center', width: 220, sort: true}
                , {field: 'pwd', title: '密码', width: 450, align: 'center'}
                , {field: 'isAdmin', title: '角色职位', width: 180, align: 'center', sort: true}
                , {field: 'fristAuthority', title: '权限', width: 400, align: 'center'}
                , {field: 'createDate', title: '创建时间', width: 200, align: 'center', sort: true }
                , {field: 'useStatus', title: '是否可用', width: 160, align: 'center', sort: true ,templet: '#useStatusTpl'}
                , {fixed: 'right', title: '操作', width: 180, align: 'center', toolbar: '#barDemo'}
            ]],
            done: function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调

            }
        });
    }
})