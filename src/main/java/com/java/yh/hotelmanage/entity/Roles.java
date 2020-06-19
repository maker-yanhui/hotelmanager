package com.java.yh.hotelmanage.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Roles {
    private Integer id;

    private String roleName;
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss")
    private Date createDate;

    private String status;

    private String flag;

    private  String fristAuthority;

    public String getFristAuthority() {
        return fristAuthority;
    }

    public void setFristAuthority(String fristAuthority) {
        this.fristAuthority = fristAuthority;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag == null ? null : flag.trim();
    }
}