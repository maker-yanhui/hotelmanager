package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.RoleAuth;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:严辉(小辉)
 * time:9:06
 */
@Service
@Transactional(readOnly = false)
public class RoleAuthServiceImpl extends BaseServiceImpl<RoleAuth> implements com.java.yh.hotelmanage.service.RoleAuthService {
}
