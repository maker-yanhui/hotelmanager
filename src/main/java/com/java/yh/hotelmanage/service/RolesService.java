package com.java.yh.hotelmanage.service;

import com.java.yh.hotelmanage.entity.Authority;
import com.java.yh.hotelmanage.entity.Roles;

import java.util.List;

/**
 * description:
 * author:严辉(小辉)
 * time:9:15
 */
public interface RolesService extends BaseService<Roles> {

    List<Authority> findAllAuthorityByid(Integer roleId)throws Exception;
}
