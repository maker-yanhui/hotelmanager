package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.Rooms;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:严辉(小辉)
 * time:9:07
 */
@Service
@Transactional(readOnly = false)
public class RoomsServiceImpl extends BaseServiceImpl<Rooms> implements com.java.yh.hotelmanage.service.RoomsService {
}
