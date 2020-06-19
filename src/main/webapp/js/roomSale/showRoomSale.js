layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期
    //日期时间范围
    laydate.render({
        elem: '#test3'
        ,type: 'datetime'
        ,range: true
        ,format:'yyyy/MM/dd HH:mm:ss'
    })
    var jsonRoomSale={};
    //表格初加载
    loadTable();
    //入住信息的方法级渲染
   function loadTable(jsonRoomSale) {
       table.render({
           elem: '#demo' //数据存放的容器，为table标签，其id="demo"
           ,height: 412  //容器高度
           ,width: 1800
           ,url: '/roomSale/showPageByPramas' //数据接口或者访问服务器端的数据路径
           ,where:jsonRoomSale
           ,limit:3   //自定义每一页的数据条数
           ,limits:[2,3,5,8,10]
           ,even:true  //逐行背景色深浅不一
           ,page: true //开启分页
           ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
               {type:'checkbox'}
               ,{field: 'id', title: 'ID', align:'center', width:80, sort: true}
               ,{field: 'roomNum', title: '房间编号', align:'center',width:200, sort: true}
               ,{field: 'customerName', title: '客人名称', width:100, align:'center',sort: true}
               ,{field: 'startDate', title: '入住时间', width:200,align:'center'}
               ,{field: 'endDate', title: '退房时间', width:200,align:'center', sort: true}
               ,{field: 'days', title: '入住时间', width: 150,align:'center'}
               ,{field: 'roomPrice', title: '房间单价', width: 150, align:'center',sort: true}
               ,{field: 'rentPrice', title: '住房金额', width: 120, align:'center',sort: true}
               ,{field: 'otherPrice', title: '其它金额', width: 250, align:'center',sort: true}
               ,{field: 'salePrice', title: '支付金额', width: 100, align:'center',sort: true}
               ,{field: 'discountPrice', title: '优惠金额', width: 100, align:'center',sort: true}
               ,{fixed: 'right',title: '操作', width:100, align:'center', toolbar: '#barDemo'}
           ]],
           done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调
               //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
               //   console.log(res);  //就是控制器所响应回的Map集合中的数据，此时数据格式为JOSN
               //得到当前页码
               //    console.log(curr);
               //得到数据总量
               //    console.log(count);
               //hoverOpenImg();  //加载放大镜
           }
       });
   }

    form.on('submit(demo1)',function (data) {
        jsonRoomSale={};
        jsonRoomSale["roomNum"]=data.field.roomNum;
        var queryTimes=data.field.queryTimes;
        if (queryTimes!=''){
           var time= queryTimes.split(" - ");
           jsonRoomSale["startTime"]=time[0];
           jsonRoomSale["endTime"]=time[1];
        }
        loadTable(jsonRoomSale);
        layer.closeAll();  //关闭所有弹框
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })
   /* function flush(jsonRoomSale) {
        table.reload('demo', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    }*/
})