package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.RoomSale;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:9:07
 */
@Service
@Transactional(readOnly = false)
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements com.java.yh.hotelmanage.service.RoomSaleService {

    public Map<String,Object> findAllRoomSale()throws Exception{
        Map<String,Object> aMap=new HashMap<>();
        //添加legend
        aMap.put("legend","各个房间销售总价");
        //添加xAxis
        List<String> list=new ArrayList<>();
        //这个map1用来装series
        Map<String,Object> map1=new HashMap<>();
        map1.put("name","各个房间销售总价");
        map1.put("type","bar");
        List<Double> list1=new ArrayList<>();
        List<Map<String, Object>> mapList = roomSaleMapper.selectAllRoomSale();
        for (Map<String,Object> map:mapList){
            list.add((String) map.get("room_num"));
            list1.add((Double)map.get("sumprice"));
        }
        map1.put("data",list1);
        aMap.put("xAxis",list);
        aMap.put("series",map1);
        return aMap;
    }
}
