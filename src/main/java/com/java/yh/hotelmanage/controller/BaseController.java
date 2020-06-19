package com.java.yh.hotelmanage.controller;

import com.java.yh.hotelmanage.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:9:19
 */
public class BaseController<T> {
    @Autowired
    protected BaseService<T> baseService;
    @Autowired
    protected OrdersService ordersService;
    @Autowired
    protected AuthorityService authorityService;
    @Autowired
    protected RoomSaleService roomSaleService;
    @Autowired
    protected RolesService rolesService;
    @RequestMapping("/scByPrimaryKey")
    public @ResponseBody String scByPrimaryKey(Integer id) {
        try {
           return baseService.removeByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "出现异常";
        }
    }
    @RequestMapping("/add")
   public @ResponseBody String add(T t) {
        try {
            return baseService.save(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "出现异常";
        }
    }

    @RequestMapping("/addSelective")
   public @ResponseBody String addSelective(T t){
        try {
           return baseService.saveSelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "出现异常";
        }
    }
    @RequestMapping("/showByPrimaryKey")
   public @ResponseBody T showByPrimaryKey(Integer id){
        try {
            return baseService.findByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @RequestMapping("/xgByPrimaryKeySelective")
   public @ResponseBody String xgByPrimaryKeySelective(T t){
        try {
           return baseService.modifyByPrimaryKeySelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "出现异常";
        }
    }
    @RequestMapping("/xgByPrimaryKey")
   public @ResponseBody String xgByPrimaryKey(T t){
        try {
           return baseService.modifyByPrimaryKey(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "出现异常";
        }
    }
    @RequestMapping("/showPageByPramas")
    public @ResponseBody Map<String,Object> showPageByPramas(Integer page, Integer limit, T t){
        Map<String,Object> map=new HashMap<>();
        try {
           map= baseService.findPageByPramas(page,limit,t);
           map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",200);
            map.put("msg","出现了异常");
        }
        System.out.println(map);
        return map;
    }
    @RequestMapping("/showByPramas")
    public @ResponseBody T showByPramas(T t){
        try {
            return baseService.findByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @RequestMapping("/showAllByPramas")
    public @ResponseBody List<T> showAllByPramas(T t){
        try {
           return baseService.findAllByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @RequestMapping("/scManyByKey")
    public @ResponseBody String scManyByKey(int[] attr,T t){
        try {
            return baseService.removeManyByKey(attr,t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/showCountByPramas")
    public @ResponseBody int showCountByPramas(T t){
        try {
            return baseService.findCountByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return 1;
        }
    }

    @RequestMapping("/findAll")
   public @ResponseBody List<T> findAll(){
        try {
            return baseService.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
