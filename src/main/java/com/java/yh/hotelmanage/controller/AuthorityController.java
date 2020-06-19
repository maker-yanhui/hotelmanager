package com.java.yh.hotelmanage.controller;

import com.java.yh.hotelmanage.entity.Authority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

/**
 * description:
 * author:严辉(小辉)
 * time:9:34
 */
@Controller
@RequestMapping("/authority")
public class AuthorityController extends BaseController<Authority> {
    @RequestMapping("/start")
    public String start(HttpSession session, Model model){
        try {
            model.addAttribute("authorityList",authorityService.findAllAuthorityByidAndParent(session));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }
}
