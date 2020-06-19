package com.java.yh.hotelmanage.controller;

import com.java.yh.hotelmanage.entity.Orders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * description:
 * author:严辉(小辉)
 * time:9:35
 */
@Controller
@RequestMapping("/orders")
public class OrdersController extends BaseController<Orders> {

    @RequestMapping("/toPay")
    public String toPay(String orderNum,String orderMoney){
        return "alipay/ordersPay";
    }

    @RequestMapping("/myOrdersPay")
    public String myOrdersPay(String out_trade_no){
        try {
            return ordersService.ordersPay(out_trade_no);
        } catch (Exception e) {
            e.printStackTrace();
            return "payError";
        }
    }
}
