package com.java.yh.hotelmanage.mapper;

import com.java.yh.hotelmanage.entity.Authority;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AuthorityMapper extends BaseMapper<Authority> {
    /**
     * 通过角色id，parent来查取权限
     * @param roleId
     * @param parent
     * @return
     * @throws Exception
     */
        List<Authority> selectAllAuthorityByidAndParent(@Param("roleId") Integer roleId, @Param("parent") Integer parent) throws Exception;

    /**
     * 只通过角色id来查询权限
     * @param roleId
     * @return
     * @throws Exception
     */
        List<Authority> selectAllAuthorityByid(Integer roleId)throws Exception;
}