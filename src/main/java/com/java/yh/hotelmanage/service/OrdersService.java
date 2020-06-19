package com.java.yh.hotelmanage.service;

import com.java.yh.hotelmanage.entity.Orders;

/**
 * description:
 * author:严辉(小辉)
 * time:9:14
 */
public interface OrdersService extends BaseService<Orders> {
    String ordersPay(String out_trade_no) throws Exception;
}
