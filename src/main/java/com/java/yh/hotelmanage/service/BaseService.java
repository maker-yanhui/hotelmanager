package com.java.yh.hotelmanage.service;

import java.util.List;
import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:8:52
 */
public interface BaseService<T> {

    String removeByPrimaryKey(Integer id) throws Exception;

    String save(T t) throws Exception;

    String saveSelective(T t)throws Exception;

    T findByPrimaryKey(Integer id)throws Exception;

    String modifyByPrimaryKeySelective(T t)throws Exception;

    String modifyByPrimaryKey(T t)throws Exception;

    Map<String,Object> findPageByPramas(Integer page, Integer limit, T t)throws Exception;

    T findByPramas(T t) throws Exception;

    List<T> findAllByPramas(T t) throws Exception;

    String removeManyByKey(int[] attr,T t) throws Exception;

    int findCountByPramas(T t) throws Exception;

    List<T> findAll() throws Exception;

}
