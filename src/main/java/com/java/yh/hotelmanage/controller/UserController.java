package com.java.yh.hotelmanage.controller;

import com.java.yh.hotelmanage.entity.User;
import com.java.yh.hotelmanage.utils.MD5;
import com.java.yh.hotelmanage.utils.VerifyCodeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * description:
 * author:严辉(小辉)
 * time:9:38
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController<User> {
    @RequestMapping("/getVerifyCode")
    public void getVerifyCode(HttpSession session, HttpServletResponse response) throws Exception{
        String verifyCode = VerifyCodeUtils.generateVerifyCode(4);
        session.setAttribute("verifyCode",verifyCode.toLowerCase());
        VerifyCodeUtils.outputImage(200,40,response.getOutputStream(),verifyCode);
    }

    @RequestMapping("/toVerify")
    public @ResponseBody String toVerify(String yzm,HttpSession session){
        String verifyCode = (String)session.getAttribute("verifyCode");
        if (yzm.toLowerCase().equals(verifyCode)){
            return "success";
        }else {
            return "failed";
        }
    }

    @RequestMapping("/toVerifyNameAndPsw")
    public @ResponseBody User toVerifyNameAndPsw(HttpSession session,User user){
        try {
             user.setPwd(MD5.md5crypt(user.getPwd()));
            User user1 = baseService.findByPramas(user);
            session.setAttribute("user",user1);
            return user1;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/toExit")
    public @ResponseBody String toExit(HttpSession session){
        try {
            session.removeAttribute("user");
            return "success";
        }catch (Exception e){
            return "failed";
        }
    }
}
