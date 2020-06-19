package com.java.yh.hotelmanage.controller;

import com.java.yh.hotelmanage.entity.Authority;
import com.java.yh.hotelmanage.entity.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * description:
 * author:严辉(小辉)
 * time:9:36
 */
@Controller
@RequestMapping("/roles")
public class RolesController extends BaseController<Roles> {
    @RequestMapping("/showAllAuthorityByid")
    public @ResponseBody List<Authority> showAllAuthorityByid(Integer roleId){
        try {
           return rolesService.findAllAuthorityByid(roleId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
