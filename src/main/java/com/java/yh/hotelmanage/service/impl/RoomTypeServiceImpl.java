package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.RoomType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:严辉(小辉)
 * time:9:08
 */
@Service
@Transactional(readOnly = false)
public class RoomTypeServiceImpl extends BaseServiceImpl<RoomType> implements com.java.yh.hotelmanage.service.RoomTypeService {
}
