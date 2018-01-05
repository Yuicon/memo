package com.yuicon.memo.repository;

import com.yuicon.memo.domain.PasswordRecord;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Yuicon
 */
@Repository
@Primary
public interface PasswordRecordRepository extends ReactiveMongoRepository<PasswordRecord, String> {
}
