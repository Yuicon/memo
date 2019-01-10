package com.yuicon.memo.repository;

import com.yuicon.memo.domain.Item;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Yuicon
 */
@Mapper
@Repository
public interface ItemRepository {

    /**
     * 添加条目
     *
     * @param item 条目
     * @return 影响数量
     */
    @Insert("INSERT INTO yuicon.item (recordId, label, value)" +
            " VALUES (#{item.recordId}, #{item.label}, #{item.value})")
    int insert(@Param("item") Item item);

    /**
     * 根据记录id查询条目
     *
     * @param recordId 记录id
     * @return 该记录的条目
     */
    @Select("SELECT * FROM yuicon.item WHERE recordId = #{recordId} AND isDelete = 0")
    List<Item> findByRecordId(@Param("recordId") int recordId);


}
