package com.yuicon.memo.repository;

import com.yuicon.memo.domain.User;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

/**
 * @author Yuicon
 */
@Repository
@Primary
public interface UserRepository extends ReactiveMongoRepository<User, String> {

    Mono<User> findByName(final String name);

}
