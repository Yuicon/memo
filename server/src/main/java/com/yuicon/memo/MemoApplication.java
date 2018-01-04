package com.yuicon.memo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

/**
 * @author Yuicon
 */
@SpringBootApplication
@EnableReactiveMongoRepositories(basePackages = "com.yuicon.memo.repository")
public class MemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MemoApplication.class, args);
	}
}
