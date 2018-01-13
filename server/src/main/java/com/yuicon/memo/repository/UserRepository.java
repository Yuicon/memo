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

    /**
     * 根据名字查找用户
     * @param name 名字
     * @return 用户
     */
    Mono<User> findByName(final String name);

    /**
     * 登陆查询
     * @param email 邮箱
     * @param masterPassword 主密码
     * @return 用户
     */
    Mono<User> findByEmailAndMasterPassword(final String email, final String masterPassword);

}
