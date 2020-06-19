package com.java.yh.hotelmanage.service.impl;

import com.java.yh.hotelmanage.entity.InRoomInfo;
import com.java.yh.hotelmanage.entity.Rooms;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:严辉(小辉)
 * time:9:04
 */
@Service
@Transactional(readOnly = false)
public class InRoomInfoServiceImpl extends BaseServiceImpl<InRoomInfo> implements com.java.yh.hotelmanage.service.InRoomInfoService {
    @Override
    public String save(InRoomInfo inRoomInfo) throws Exception{
        int insert = inRoomInfoMapper.insert(inRoomInfo);
        Rooms rooms=new Rooms();
        rooms.setId(inRoomInfo.getRoomId());
        rooms.setRoomStatus("1");
        int i = roomsMapper.updateByPrimaryKeySelective(rooms);
        if (insert>0&&i>0){
            return "success";
        }else {
            return "failed";
        }
    }
}
