package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.Authority;
import com.java.yh.hotelmanage.entity.Roles;
import com.java.yh.hotelmanage.entity.User;
import com.java.yh.hotelmanage.utils.MD5;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:9:08
 */
@Service
@Transactional(readOnly = false)
public class UserServiceImpl extends BaseServiceImpl<User> implements com.java.yh.hotelmanage.service.UserService {
    @Override
    public Map<String, Object> findPageByPramas(Integer page, Integer limit, User user) throws Exception {
        Map<String, Object> map = super.findPageByPramas(page, limit, user);
        List<User> list = (List<User>) map.get("data");
        for (int i=0;i<list.size();i++){
            User user1 = list.get(i);
            //一级权限
            List<Authority> authorities = authorityMapper.selectAllAuthorityByidAndParent(user1.getRoleId(), 0);
            String fristAuthority="";
            for (int j=0;j<authorities.size();j++){
                fristAuthority+=authorities.get(j).getAuthorityName()+",";
            }
            String fristAuthority1 = fristAuthority.substring(0, fristAuthority.length() - 1);
            user1.setFristAuthority(fristAuthority1);
        }
        return map;
    }

    @Override
    public String save(User user) throws Exception {
        user.setPwd(MD5.md5crypt(user.getPwd()));
        return super.save(user);
    }
}
