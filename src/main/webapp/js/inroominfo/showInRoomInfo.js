layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期
    var currentPage;
    laydate.render({
        elem: '#endDate'
        ,format:"yyyy/MM/dd HH:mm:ss"
        ,value: new Date() //参数即为：2018-08-20 20:08:08 的时间戳
    });

    //入住信息的方法级渲染
    table.render({
        elem: '#demo' //数据存放的容器，为table标签，其id="demo"
        ,height: 412  //容器高度
        ,width: 1600
        ,url: '/inRoomInfo/showPageByPramas' //数据接口或者访问服务器端的数据路径
        ,limit:3   //自定义每一页的数据条数
        ,limits:[2,3,5,8,10]
        ,even:true  //逐行背景色深浅不一
        ,page: true //开启分页
        ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
            {type:'checkbox'}
            ,{field: 'id', title: 'ID', align:'center', width:70, sort: true}
            ,{field: 'roomNum', title: '房间号', align:'center',width:80,templet:'<div>{{d.rooms.roomNum}}</div>'}
            ,{field: 'roomPic', title: '封面图', width:150, align:'center',sort: true,templet:'<div><img src="{{d.rooms.roomPic}}"></div>'}
            ,{field: 'roomTypeName', title: '类型', width:80,align:'center',templet:'<div>{{d.rooms.roomType.roomTypeName}}</div>'}
            ,{field: 'roomPrice', title: '价格', width: 80,align:'center', sort: true,templet:'<div>{{d.rooms.roomType.roomPrice}}</div>'}
            ,{field: 'customerName', title: '客人姓名', width: 100,align:'center'}
            ,{field: 'gender', title: '性别', width: 80, align:'center',sort: true,templet:'#sex'}
            ,{field: 'isVip', title: 'vip', width: 80, align:'center',sort: true,templet:'#vip'}
            ,{field: 'idcard', title: '身份证号', width: 180, align:'center',sort: true}
            ,{field: 'phone', title: '手机号', width: 120, align:'center',sort: true}
            ,{field: 'money', title: '押金', width: 80,align:'center'}
            ,{field: 'createDate', title: '入住时间', width: 180,align:'center' }
            ,{field: 'outRoomStatus', title: '状态', width: 80,align:'center',templet:'#outRoomStatus'}
            ,{fixed: 'right',title: '操作', width:160, align:'center', toolbar: '#barDemo'}
        ]],
        done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            //   console.log(res);  //就是控制器所响应回的Map集合中的数据，此时数据格式为JOSN
            //得到当前页码
            //    console.log(curr);
            //得到数据总量
            //    console.log(count);
            currentPage =curr
            hoverOpenImg();  //加载放大镜
        }
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        if(layEvent === 'exitroom'){ //退房
            //do somehing
            $("#otherPrice").val(0);
            $("#remark").val("");
            layer.open({
                    type:1,  //弹框类型
                    title:"退房操作界面", //弹框标题
                    area:['700px','480px'],  //弹框的宽高度
                    anim: 4,  //弹框弹出时的动画效果
                    shade:0.5,  //背景的透明度
                    content:$("#exitInRoomInfoDiv")  //弹出的内容
                })
            //数据回显
            form.val("exitInRoomInfoForm",{
                "inRoomInfo_id":data.id
                ,"roomNum":data.rooms.roomNum
                ,"customerName":data.customerName
                ,"idcard":data.idcard
                ,"roomPrice":data.rooms.roomType.roomPrice
                ,"createDate":data.createDate
            })
            //是否会员回显
            if (data.isVip==1){
                $("#isVip").val("是");
                loadVipInfo(obj);
            }else {
                $("#isVip").val("否");
            }
            var startTime=getDateStr(data.createDate);
            var endTime=getDateStr($("#endDate").val());
            var days=getDays(startTime,endTime);
            if(days==0){
                days=1;
            }
            $("#days").text(days);
            //计算消费金额
            var roomPrice=parseFloat(data.rooms.roomType.roomPrice);
            var rate=parseFloat($("#vipRate").val());
            var money=days*roomPrice*rate;
            $("#otherPrice").blur(function () {
                var otherMoney=parseFloat($("#otherPrice").val());
                var sum=money+otherMoney;
                $("#zprice").text(sum);
            })
            form.on("submit(demo3)",function (data) {
                // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
                //  console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
                //  console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}、
                var date=new Date();
                var jsonOrders={};
                jsonOrders["orderMoney"]=$("#zprice").text();
                jsonOrders["remark"]=data.field.remark;
                jsonOrders["orderStatus"]="0";
                jsonOrders["iriId"]=data.field.inRoomInfo_id;
                jsonOrders["createDate"]=getNowDate(date);
                jsonOrders["flag"]="1";
                jsonOrders["orderOther"]=data.field.roomNum+","+data.field.customerName+","+data.field.createDate+","+data.field.endDate+","+$("#days").text();
                jsonOrders["orderPrice"]=data.field.roomPrice+","+data.field.otherPrice+","+$("#zprice").text();
                jsonOrders["orderNum"]=dateReplace(getNowDate(date))+getRandom(6);
                saveOrders(jsonOrders);
                layer.closeAll();  //关闭所有弹框
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            })
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                delInRoomInfo(obj);
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if(layEvent === 'exitroom'){ //编辑
            //do something

            //同步更新缓存对应的值
            obj.update({
                username: '123'
                ,title: 'xxx'
            });
        }
    });

    //自定义表单验证
    form.verify({
        otherPrice: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value < 0) {
                return '其他消费金额要大于0';
            }
        }
    });
    /***********************自定义的函数****************************/
    //图片放大镜
    function hoverOpenImg(){
        var img_show = null; // tips提示
        $('td img').hover(function(){
            var img = "<img class='img_msg' src='"+$(this).attr('src')+"' style='width:230px;' />";
            img_show = layer.tips(img, this,{
                tips:[2, 'rgba(41,41,41,.5)']
                ,area: ['260px']
            });
        },function(){
            layer.close(img_show);
        });
        $('td img').attr('style','max-width:70px');
    }
    function delInRoomInfo(obj) {
        $.ajax({
            type:"post",
            url:"/inRoomInfo/xgByPrimaryKeySelective",
            data:{
               "id":obj.data.id,
                "status":0
            },
            success:function (data) {
                if(data==="success"){
                    layer.msg('数据删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                }else {
                    layer.msg('数据删除失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }

    function loadVipInfo(obj) {
        $.ajax({
            type:"post",
            url:"/vip/showByPramas",
            async:false,  //允许ajax外部的变量获得去数据
            data:{
                "idcard":obj.data.idcard
            },
            success:function (data) {
                $("#vipNum").val(data.vipNum);
                $("#vipRate").val(data.vipRate);
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }

    function saveOrders(jsonOrders) {
        $.ajax({
            type:"post",
            url:"/orders/add",
            data:jsonOrders,
            success:function (data) {
                if(data==="success"){
                    layer.msg('退房成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    table.reload('demo', {  //指明具体要重新加载的table容器，容器id
                        page: {
                            curr: currentPage  //重新从第 1 页开始
                        }
                    });
                }else {
                    layer.msg('退房失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {
                layer.msg("服务器出现错误",{icon: 3,time:2000,anim: 6,shade:0.5})
            }
        })
    }
    //将目前的时间格式2019/08/06 12:12:08  -->  2019/08/06
    function getDateStr(dateStr) {
        var indexOf = dateStr.indexOf(" ");  //取到" "的下标
        dateStr = dateStr.substring(0,indexOf);  //第1个参数为下标，第2个参数为切割的字符串长度
        return dateStr;
    }

    //计算天数
    function getDays(startDate,endDate){  //2019/09/09   2019/10/10
        var date1Str = startDate.split("/");
        var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
        var date2Str = endDate.split("/");
        var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
        var t1 = date1Obj.getTime();
        var t2 = date2Obj.getTime();
        var datetime=1000*60*60*24;
        var minusDays = Math.floor(((t2-t1)/datetime));
        var days = Math.abs(minusDays);
        return minusDays;
    }
    //获取当前时间字符串     Date()   ---->  yyyy/MM/dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }

    //获取随机数
    function getRandom(num) {
        var count = '';   //随机数
        for (var i=0;i<num;i++){
            count += parseInt(Math.random()*10)  //0.123123123...
        }
        return count;
    }
});