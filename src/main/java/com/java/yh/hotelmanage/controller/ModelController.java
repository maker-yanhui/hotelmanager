package com.java.yh.hotelmanage.controller;

import com.sun.org.apache.regexp.internal.RE;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * description:
 * author:严辉(小辉)
 * time:10:28
 */
@Controller
@RequestMapping("/model")
public class ModelController {
 /*   @RequestMapping("/start")
    public String start(){
        return "index";
    }*/

    @RequestMapping("/toShowInRoomInfo")
    public String toShowInRoomInfo(){
        return "inroominfo/showInRoomInfo";
    }

    @RequestMapping("/toSaveInRoomInfo")
    public String toSaveInRoomInfo(){
        return "inroominfo/saveInRoomInfo";
    }

    @RequestMapping("/toShowOrders")
    public String toShowOrders(){
        return "orders/showOrders";
    }

    @RequestMapping("/toShowRoomSale")
    public String toShowRoomSale(){
        return "roomSale/showRoomSale";
    }

    @RequestMapping("/toShowVip")
    public String toShowVip(){
        return "vip/showVip";
    }

    @RequestMapping("/toSaveVip")
    public String toSaveVip(){
        return "vip/saveVip";
    }

    @RequestMapping("/toShowRooms")
    public String toShowRooms(){
        return "rooms/showRooms";
    }

    @RequestMapping("/toLogin")
    public String toLogin(){
        return "login/login";
    }

    @RequestMapping("/toShowRole")
    public String toShowRole(){
        return "role/showRole";
    }
    @RequestMapping("/toShowUser")
    public String toShowUser(){
        return "user/showUser";
    }

    @RequestMapping("/toSaveUser")
    public String toSaveUser(){
        return "user/saveUser";
    }

    @RequestMapping("/toShowIdd")
    public String toShowIdd(){
        return "data/showIdd";
    }

    @RequestMapping("/toShowRoomType")
    public String toShowRoomType(){
        return "roomType/showRoomType";
    }
}
