package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.Authority;
import com.java.yh.hotelmanage.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:8:53
 */
@Service
@Transactional(readOnly = false)
public class AuthorityServiceImpl extends BaseServiceImpl<Authority> implements com.java.yh.hotelmanage.service.AuthorityService {
    /**
     * 将权限分为一级，二级装到list里的map集合，让他们成为一个包含关系的结果
     * @param session
     * @return
     * @throws Exception
     */
    public List<Map<String,Object>> findAllAuthorityByidAndParent(HttpSession session) throws Exception{
        List<Map<String,Object>> mapList=new ArrayList<>();
        User user = (User)session.getAttribute("user");
        //现在取出来的为一级标题栏
        List<Authority> authorityList = authorityMapper.selectAllAuthorityByidAndParent(user.getRoleId(), 0);
        for (int i=0;i<authorityList.size();i++){
            Map<String,Object> map=new HashMap<>();
            Authority authority = authorityList.get(i);
            map.put("id",authority.getId());
            map.put("authorityName",authority.getAuthorityName());
            map.put("authorityUrl",authority.getAuthorityUrl());
            //取出2级标题栏
            List<Authority> authorities = authorityMapper.selectAllAuthorityByidAndParent(user.getRoleId(), authority.getId());
            map.put("list",authorities);
            mapList.add(map);
        }
        return mapList;
    }
}
