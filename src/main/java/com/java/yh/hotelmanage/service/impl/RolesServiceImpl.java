package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.Authority;
import com.java.yh.hotelmanage.entity.Roles;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:9:06
 */
@Service
@Transactional(readOnly = false)
public class RolesServiceImpl extends BaseServiceImpl<Roles> implements com.java.yh.hotelmanage.service.RolesService {
    @Override
    public Map<String, Object> findPageByPramas(Integer page, Integer limit, Roles roles) throws Exception {
        Map<String, Object> map = super.findPageByPramas(page, limit, roles);
        List<Roles> list = (List<Roles>) map.get("data");
        for (int i=0;i<list.size();i++){
            Roles roles1 = list.get(i);
            //一级权限
            List<Authority> authorities = authorityMapper.selectAllAuthorityByidAndParent(roles1.getId(), 0);
            String fristAuthority="";
            for (int j=0;j<authorities.size();j++){
                fristAuthority+=authorities.get(j).getAuthorityName()+",";
            }
            String fristAuthority1 = fristAuthority.substring(0, fristAuthority.length() - 1);
            roles1.setFristAuthority(fristAuthority1);
        }
        return map;
    }
    @Override
   public List<Authority> findAllAuthorityByid(Integer roleId)throws Exception{
        return authorityMapper.selectAllAuthorityByid(roleId);
   }
}
