package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.InRoomInfo;
import com.java.yh.hotelmanage.entity.Orders;
import com.java.yh.hotelmanage.entity.RoomSale;
import com.java.yh.hotelmanage.entity.Rooms;
import com.java.yh.hotelmanage.utils.StringToDate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:严辉(小辉)
 * time:9:05
 */
@Service
@Transactional(readOnly = false)
public class OrdersServiceImpl extends BaseServiceImpl<Orders> implements com.java.yh.hotelmanage.service.OrdersService {

    @Override
    public String save(Orders orders) throws Exception{
        int insert = baseMapper.insert(orders);
        InRoomInfo inRoomInfo=new InRoomInfo();
        inRoomInfo.setId(orders.getIriId());
        inRoomInfo.setOutRoomStatus("1");
        int i = inRoomInfoMapper.updateByPrimaryKeySelective(inRoomInfo);
        InRoomInfo inRoomInfo1 = inRoomInfoMapper.selectByPrimaryKey(orders.getIriId());
        Rooms rooms=new Rooms();
        rooms.setId(inRoomInfo1.getRoomId());
        rooms.setRoomStatus("2");
        int i1 = roomsMapper.updateByPrimaryKeySelective(rooms);
        if (insert>0&&i>0&&i1>0){
            return "success";
        }else {
            return "failed";
        }
    }

    public String ordersPay(String out_trade_no) throws Exception{
        Orders orders=new Orders();
        orders.setOrderNum(out_trade_no);
        Orders orders1 = baseMapper.selectByPramas(orders);
        orders1.setOrderStatus("1");
        int i = baseMapper.updateByPrimaryKey(orders1);

        String[] orderOther = orders1.getOrderOther().split(",");
        String[] orderPrice = orders1.getOrderPrice().split(",");
        RoomSale roomSale=new RoomSale();
        roomSale.setRoomNum(orderOther[0]);
        roomSale.setCustomerName(orderOther[1]);
        roomSale.setStartDate(StringToDate.format(orderOther[2]));
        roomSale.setEndDate(StringToDate.format(orderOther[3]));
        roomSale.setDays(Integer.parseInt(orderOther[4]));
        roomSale.setRoomPrice(Double.valueOf(orderPrice[0]));
        roomSale.setOtherPrice(Double.valueOf(orderPrice[1]));
        roomSale.setSalePrice(Double.valueOf(orderPrice[2]));
        roomSale.setRentPrice(Double.valueOf(orderPrice[2])-Double.valueOf(orderPrice[1]));
        roomSale.setDiscountPrice(Integer.parseInt(orderOther[4])*Double.valueOf(orderPrice[0])-(Double.valueOf(orderPrice[2])-Double.valueOf(orderPrice[1])));
        int insert = roomSaleMapper.insert(roomSale);
        if (i>0&&insert>0){
            return "redirect:/authority/start";
        }else {
            return "payError";
        }
    }


}
