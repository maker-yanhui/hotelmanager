package com.java.yh.hotelmanage.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.java.yh.hotelmanage.entity.RoomSale;
import com.java.yh.hotelmanage.mapper.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * description:
 * author:严辉(小辉)
 * time:8:36
 */
public class BaseServiceImpl<T> implements com.java.yh.hotelmanage.service.BaseService<T> {

    @Autowired
    protected BaseMapper<T> baseMapper;
    @Autowired
    protected InRoomInfoMapper inRoomInfoMapper;
    @Autowired
    protected RoomsMapper roomsMapper;
    @Autowired
    protected RoomSaleMapper roomSaleMapper;

    @Autowired
    protected AuthorityMapper authorityMapper;
    /**
     *根据id删除信息
     * @param id
     * @return
     */
   @Override
   public String removeByPrimaryKey(Integer id) throws Exception{
       if (baseMapper.deleteByPrimaryKey(id)>0){
           return "success";
       }else {
           return "failed";
       }
   }

    /**
     * 根据传入的对象插入
     * @param t
     * @return
     */
    @Override
    public String save(T t) throws Exception{
        if (baseMapper.insert(t)>0){
            return "success";
        }else {
            return "failed";
        }
    }

    /**
     * 动态插入
     * @param t
     * @return
     */
   @Override
   public String saveSelective(T t)throws Exception{
       if (baseMapper.insertSelective(t)>0){
           return "success";
       }else {
           return "failed";
       }
   }

    /**
     * 根据id查询
     * @param id
     * @return
     */
   @Override
   public T findByPrimaryKey(Integer id)throws Exception{
       T t = baseMapper.selectByPrimaryKey(id);
       return t;
   }

    /**
     * 动态更新
     * @param t
     * @return
     */
   @Override
   public String modifyByPrimaryKeySelective(T t)throws Exception{
       if (baseMapper.updateByPrimaryKeySelective(t)>0){
           return "success";
       }else {
           return "failed";
       }
   }

    /**
     * 根据传入的对象更新
     * @param t
     * @return
     */
    @Override
    public String modifyByPrimaryKey(T t)throws Exception{
        if (baseMapper.updateByPrimaryKey(t)>0){
            return "success";
        }else {
            return "failed";
        }
    }

    /**
     * 根据条件分页查询
     * @param page
     * @param limit
     * @param t
     * @return
     * @throws Exception
     */
    @Override
   public Map<String,Object> findPageByPramas(Integer page, Integer limit, T t)throws Exception{
       Map<String,Object> map=new HashMap<String,Object>();
       PageHelper.startPage(page,limit);
       PageInfo<T> pageInfo=new PageInfo<T>(baseMapper.selectPageByPramas(t));
       map.put("count",pageInfo.getTotal());
       map.put("data",pageInfo.getList());
       return map;
    }
    @Override
    public T findByPramas(T t) throws Exception{
        return baseMapper.selectByPramas(t);
    }

    /**
     * 根据传入对象动态查询
     * @param t
     * @return
     * @throws Exception
     */
   public List<T> findAllByPramas(T t) throws Exception{
       return baseMapper.selectAllByPramas(t);
   }

    /**
     * 通过id值多条件删除
     * @param attr
     * @param t
     * @return
     * @throws Exception
     */
    public String removeManyByKey(int[] attr,T t) throws Exception{
       if (baseMapper.deleteManyByKey(attr,t)>0){
           return "success";
       }else {
           return "failed";
       }
    }

    /**
     * d动态查询条数
     * @param t
     * @return
     * @throws Exception
     */
    public int findCountByPramas(T t) throws Exception{
        return baseMapper.selectCountByPramas(t);
    }
    /**
     * 无需条件查询所有信息
     * @return
     * @throws Exception
     */
    public List<T> findAll() throws Exception{
        return baseMapper.selectAll();
    }
}
