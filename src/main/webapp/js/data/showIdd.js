var myChart = echarts.init(document.getElementById('main'));

$.get('/roomSale/showAllRoomSale').done(function (data) {
    myChart.setOption({
        title: {
            text: '各个房间收入分析'
        },
        tooltip: {},
        toolbox: {  //工具
            feature: {
                dataView: {}, //原始数据视图按钮
                saveAsImage: {
                    pixelRatio: 5  //保存为图片,数字表示图片清晰度
                },
                restore: {},
                magicType : {show: true, type: ['line', 'bar']}  //显示的图标切换
            }
        },
        legend: {
            data:data.legend
        },
        xAxis: {
            data: data.xAxis
        },
        yAxis: {},
        series: [{
            name: data.series.name,
            type: data.series.type,
            data: data.series.data
        }]
    });
});