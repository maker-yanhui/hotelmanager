package com.java.yh.hotelmanage.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class User {
    private Integer id;

    private String username;

    private String pwd;
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss")
    private Date createDate;

    private String useStatus;

    private String isAdmin;

    private Integer roleId;

    private String fristAuthority;

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd == null ? null : pwd.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUseStatus() {
        return useStatus;
    }

    public void setUseStatus(String useStatus) {
        this.useStatus = useStatus == null ? null : useStatus.trim();
    }

    public String getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(String isAdmin) {
        this.isAdmin = isAdmin == null ? null : isAdmin.trim();
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", pwd='" + pwd + '\'' +
                ", createDate=" + createDate +
                ", useStatus='" + useStatus + '\'' +
                ", isAdmin='" + isAdmin + '\'' +
                ", roleId=" + roleId +
                '}';
    }
}