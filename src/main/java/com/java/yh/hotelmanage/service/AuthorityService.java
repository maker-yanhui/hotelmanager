package com.java.yh.hotelmanage.service;

import com.java.yh.hotelmanage.entity.Authority;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:9:10
 */
public interface AuthorityService extends BaseService<Authority> {

    List<Map<String,Object>> findAllAuthorityByidAndParent(HttpSession session) throws Exception;
}

