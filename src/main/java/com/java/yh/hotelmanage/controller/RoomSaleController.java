package com.java.yh.hotelmanage.controller;

import com.java.yh.hotelmanage.entity.RoomSale;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:9:37
 */
@Controller
@RequestMapping("/roomSale")
public class RoomSaleController extends BaseController<RoomSale> {

    @RequestMapping("/showAllRoomSale")
   public @ResponseBody Map<String,Object> showAllRoomSale(){
        try {
            return roomSaleService.findAllRoomSale();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
