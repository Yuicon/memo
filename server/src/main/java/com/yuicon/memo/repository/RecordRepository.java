package com.yuicon.memo.repository;

import com.yuicon.memo.domain.Record;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yuicon
 */
@Repository
@Primary
public interface RecordRepository extends ReactiveMongoRepository<Record, String> {
}
