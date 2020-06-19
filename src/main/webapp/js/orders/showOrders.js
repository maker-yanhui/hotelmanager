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
    var josnOrders={};
    //初加载表格
    loadTable();
    function loadTable(josnOrders) {
        //入住信息的方法级渲染
        table.render({
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            ,height: 412  //容器高度
            ,width: 1600
            ,url: '/orders/showPageByPramas' //数据接口或者访问服务器端的数据路径
            ,where:josnOrders
            ,limit:3   //自定义每一页的数据条数
            ,limits:[2,3,5,8,10]
            ,even:true  //逐行背景色深浅不一
            ,page: true //开启分页
            ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', align:'center', width:80, sort: true}
                ,{field: 'orderNum', title: '订单编号', align:'center',width:200, sort: true}
                ,{field: 'roomPic', title: '客人名称', width:100, align:'center',sort: true,templet:'<div>{{d.inRoomInfo.customerName}}</div>'}
                ,{field: 'roomTypeName', title: '身份证号', width:200,align:'center',templet:'<div>{{d.inRoomInfo.idcard}}</div>'}
                ,{field: 'roomPrice', title: 'vip', width: 80,align:'center', sort: true,templet:'#isVipTpl'}
                ,{field: 'customerName', title: '手机号', width: 150,align:'center',templet:'<div>{{d.inRoomInfo.phone}}</div>'}
                ,{field: 'createDate', title: '下单时间', width: 150, align:'center',sort: true}
                ,{field: 'orderMoney', title: '总价', width: 120, align:'center',sort: true}
                ,{field: 'remark', title: '备注', width: 250, align:'center',sort: true}
                ,{field: 'orderStatus', title: '状态', width: 100, align:'center',sort: true,templet:'#orderStatusTpl'}
                ,{fixed: 'right',title: '操作', width:100, align:'center', toolbar: '#barDemo'}
            ]],
            done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                //   console.log(res);  //就是控制器所响应回的Map集合中的数据，此时数据格式为JOSN
                //得到当前页码
                //    console.log(curr);
                //得到数据总量
                //    console.log(count);
                currentPage =curr
                //hoverOpenImg();  //加载放大镜
            }
        });
    }
    form.on("submit(demo1)",function (data) {
        josnOrders={};
        josnOrders["orderNum"]=data.field.orderNum;
        josnOrders["orderStatus"]=data.field.orderStatus;
        if(data.field.queryTimes!=''){
            var attr=data.field.queryTimes.split(" - ");
            console.log(attr[0])
            josnOrders["startTime"]=attr[0];
            josnOrders["endTime"]=attr[1];
        }
        //执行条件查询
        loadTable(josnOrders);
        layer.closeAll();  //关闭所有弹框
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })
    
    //删除已结算订单
    table.on('tool(test)',function (obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if (layEvent=='del'){
            delOrders(obj);
        }else {
            layer.confirm('确定要支付此订单么？', function (index) {
                //由系统另外开启一个浏览器对话框
                window.open('/orders/toPay?orderNum='+data.orderNum+'&orderMoney='+data.orderMoney);
                layer.close(index);
            });
        }
    })
    $("#batchBtn").click(function () {
        var checkStatus = table.checkStatus('demo'); //idTest 即为基础参数 id 对应的值
        var flag=true;
        var str='';
        console.log(checkStatus.data) //获取选中行的数据
      if (checkStatus.data.length!=0){
          for (var i=0;i<checkStatus.data.length;i++){
              if(checkStatus.data[i].orderStatus==0){
                  flag=false;
                  break;
              }
              str+=checkStatus.data[i].id+",";
          }
          if (flag){
              layer.confirm('真的删除选中的订单么？', function(index){
                  var str1=str.substring(0,str.length-1);
                  //批量删除
                  delManyOrders(str1);

                  layer.close(index);  //关闭询问框
              });

          }else {
              layer.msg('你选中要删除的订单有未支付的！！', {icon: 2,time:2000,anim: 6,shade:0.5});
          }
      }else {
          layer.msg('你还未选中要删除的订单！！', {icon: 3,time:2000,anim: 6,shade:0.5});
      }

    })
    function flush() {
        //上述方法等价于
        table.reload('demo', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
        }); //只重载数据
    }
    //删除支付订单
    function delOrders(obj) {
        $.ajax({
            type:"post",
            url:"/orders/xgByPrimaryKeySelective",
            data:{
                "id":obj.data.id,
                "flag":0
            },
            success:function (data) {
                if (data==='success'){
                    layer.msg('订单信息删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                }else {
                    layer.msg('订单信息删除失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }

    //批量删除
    function delManyOrders(str1) {
        $.ajax({
            type:"post",
            url:"/orders/scManyByKey",
            data:{
                "attr":str1,
                "flag":0
            },
            success:function (data) {
                if (data==='success'){
                    layer.msg('订单信息批量删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                  flush();
                }else {
                    layer.msg('订单信息批量删除失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }
});