package com.java.yh.hotelmanage.controller;

import com.java.yh.hotelmanage.entity.Rooms;
import com.java.yh.hotelmanage.utils.FileUploadUtil;
import com.java.yh.hotelmanage.utils.QiNiuUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:9:37
 */
@Controller
@RequestMapping("/rooms")
public class RoomsController extends BaseController<Rooms> {
    @RequestMapping("/upload")
    public @ResponseBody Map<String,Object> upload(MultipartFile field){
        try {
            return QiNiuUtil.fileUpload(field);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
