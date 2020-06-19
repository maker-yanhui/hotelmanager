package com.java.yh.hotelmanage.mapper;

import com.java.yh.hotelmanage.entity.RoomSale;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

public interface RoomSaleMapper extends BaseMapper<RoomSale>{
    @Select("SELECT room_num,SUM(sale_price) AS sumprice FROM roomsale GROUP BY room_num")
    List<Map<String,Object>> selectAllRoomSale()throws Exception;
}