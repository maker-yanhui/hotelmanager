package com.java.yh.hotelmanage.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * description:
 * author:严辉(小辉)
 * time:23:05
 */
public interface BaseMapper <T>{
    /**
     *根据id删除信息
     * @param id
     * @return
     */
    int deleteByPrimaryKey(Integer id) throws Exception;

    /**
     * 根据传入的对象插入
     * @param t
     * @return
     */
    int insert(T t) throws Exception;

    /**
     * 动态插入
     * @param t
     * @return
     */
    int insertSelective(T t)throws Exception;

    /**
     * 根据id查询
     * @param id
     * @return
     */
    T selectByPrimaryKey(Integer id)throws Exception;

    /**
     * 动态更新
     * @param t
     * @return
     */
    int updateByPrimaryKeySelective(T t)throws Exception;

    /**
     * 根据传入的对象更新
     * @param t
     * @return
     */
    int updateByPrimaryKey(T t)throws Exception;

    /**
     * 分页条件查询
     * @param t
     * @return
     * @throws Exception
     */
    List<T> selectPageByPramas(@Param("t")T t)throws Exception;

    /**
     * 根据动态条件查询一条数据
     * @param t
     * @return
     * @throws Exception
     */
    T selectByPramas(T t) throws Exception;

    /**
     * 根据传入对象动态查询
     * @param t
     * @return
     * @throws Exception
     */
    List<T> selectAllByPramas(T t) throws Exception;

    /**
     * 通过id值批量删除
     * @param attr
     * @param t
     * @return
     * @throws Exception
     */
    int deleteManyByKey(@Param("attr") int[] attr,@Param("t") T t) throws Exception;

    /**
     * 动态查询数据的个数
     * @param t
     * @return
     * @throws Exception
     */
    int selectCountByPramas(T t) throws Exception;

    /**
     * 无需条件查询所有信息
     * @return
     * @throws Exception
     */
    List<T> selectAll() throws Exception;
}
