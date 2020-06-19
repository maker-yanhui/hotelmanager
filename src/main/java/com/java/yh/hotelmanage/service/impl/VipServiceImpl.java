package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.Vip;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:严辉(小辉)
 * time:9:09
 */
@Service
@Transactional(readOnly = false)
public class VipServiceImpl extends BaseServiceImpl<Vip> implements com.java.yh.hotelmanage.service.VipService {
}
