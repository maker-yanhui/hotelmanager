layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;
    var queryJsonVip={};
    var phoneif=true;
    var vipPhone='';
    loadVip();
    function loadVip(queryJsonVip) {
        table.render({
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            ,height: 412  //容器高度
            ,url: '/vip/showPageByPramas' //数据接口或者访问服务器端的数据路径
            ,limit:3   //自定义每一页的数据条数
            ,limits:[2,3,5,8,10]
            ,where:queryJsonVip  //将条件加到此处
            ,even:true  //逐行背景色深浅不一
            ,page: true //开启分页
            ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', align:'center', width:120, sort: true}
                ,{field: 'vipNum', title: '会员卡号', align:'center',width:220, sort: true}
                //edit: 'text'为可以直接单击编辑此列中的单元格
                ,{field: 'customerName', title: '客人姓名', width:180, align:'center',sort: true,edit: 'text'}
                ,{field: 'vipRate', title: '会员类型', width:240,align:'center',templet:'#vipRateTpl'}
                ,{field: 'gender', title: '性别', width: 140,align:'center',sort: true,templet:'#genderTpl'}
                ,{field: 'idcard', title: '身份证号', width: 240,align:'center'}
                ,{field: 'phone', title: '手机号', width: 180, align:'center',sort: true}
                ,{field: 'createDate', title: '创建时间', width: 240, align:'center',sort: true}
                ,{fixed: 'right',title: '操作', width:180, align:'center', toolbar: '#barDemo'}
            ]],
            done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调

            }
        });
    }
    form.on('submit(demo1)',function (data) {
        queryJsonVip={};
        queryJsonVip=data.field;
        loadVip(queryJsonVip);
       layer.closeAll();
        return false;
    });
    table.on('tool(test)',function (obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
        if (layEvent==="upd"){
            layer.open({
                type:1,  //弹框类型
                title:"修改会员信息界面", //弹框标题
                area:['400px','300px'],  //弹框的宽高度
                anim: 4,  //弹框弹出时的动画效果
                shade:0.5,  //背景的透明度
                content:$("#updVipDiv")  //弹出的内容
            });
            $("#phone").val(data.phone);
            vipPhone=data.phone;
            if(data.vipRate==0.8){
                var str='<option value="0.8">超级会员</option><option value="0.9">普通会员</option>';
                $("#vipRate").html(str);

            }else {
                var str='<option value="0.9">普通会员</option><option value="0.8">超级会员</option>';
                $("#vipRate").html(str);
            }
            form.render("select"); //渲染下拉框

            $("#phone").change(function () {
                if(vipPhone==$(this).val()){
                    layer.tips('此号码还是原来号码！！', $("#phone"), {tips: [2,'green'],time:2000,});
                }else {
                    checkedPhone($(this).val());
                }
            })
            //提交修改vip
            form.on('submit(demo3)',function (data) {
                if(phoneif){
                    var updJsonVip = {};
                    updJsonVip["phone"]=data.field.phone;
                    updJsonVip["vipRate"]=data.field.vipRate;
                    updJsonVip["id"]=obj.data.id;
                    updVip(updJsonVip,obj);
                    layer.closeAll();
                }else {
                    layer.msg('手机号有误！！', {icon: 2,time:2000,anim: 6,shade:0.5});
                }
                return false;
            })
        }
    })
    table.on('edit(test)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        var updJsonVip = {};
        updJsonVip['id'] = obj.data.id; //被修改的数据id
        updJsonVip[obj.field] = obj.value;//修改后的数据
        //执行修改
        updVip(updJsonVip,"customerName");
    });
    //验证手机的唯一性
    function checkedPhone(phone) {
        $.ajax({
            type:"post",
            url:"/vip/showCountByPramas",
            data:{
                "phone":phone
            },
            success:function (data) {
                if (data>0){
                    phoneif=false;
                    layer.tips('手机号已使用！！', $("#phone"), {tips: [2,'#fc1505'],time:2000,});
                }else {
                    phoneif=true;
                    layer.tips('手机号可用。。', $("#phone"), {tips: [2,'green'],time:2000,});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }
    //更新vip
    function updVip(updJsonVip,obj){
        $.ajax({
            type:"post",
            url:"/vip/xgByPrimaryKeySelective",
            data:updJsonVip,
            success:function (msg) {
                if (msg=="success"){
                    layer.msg('会员数据修改成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                  if (obj!="customerName"){
                      obj.update({
                          vipRate: updJsonVip.vipRate
                          ,phone: updJsonVip.phone
                      });
                  }
                }else {
                    layer.msg('会员数据修改失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        })
    }
});