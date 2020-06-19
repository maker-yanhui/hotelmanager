package com.java.yh.hotelmanage.service;

import com.java.yh.hotelmanage.entity.RoomSale;

import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:9:15
 */
public interface RoomSaleService extends BaseService<RoomSale> {
    Map<String,Object> findAllRoomSale()throws Exception;
}
