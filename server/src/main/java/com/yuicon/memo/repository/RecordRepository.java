package com.yuicon.memo.repository;

import com.yuicon.memo.domain.Record;
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
public interface RecordRepository {

    /**
     * 添加记录
     *
     * @param record 记录
     * @return 影响数量
     */
    @Insert("INSERT INTO ngdc.record (uid, source, createTime)" +
            " VALUES (#{record.uid}, #{record.source}, #{record.createTime})")
    int insert(@Param("record") Record record);

    /**
     * 根据用户id查询记录
     *
     * @param uid 用户id
     * @return 该用户的记录
     */
    @Select("SELECT * FROM ngdc.record WHERE uid = #{uid} AND delete = false")
    List<Record> findByUid(@Param("uid") int uid);


}
