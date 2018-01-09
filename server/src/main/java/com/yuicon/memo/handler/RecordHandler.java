package com.yuicon.memo.handler;

import com.yuicon.memo.domain.Record;
import com.yuicon.memo.domain.User;
import com.yuicon.memo.repository.RecordRepository;
import com.yuicon.memo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collections;

import static org.springframework.http.MediaType.APPLICATION_JSON;

/**
 * @author Yuicon
 */
@Component
public class RecordHandler {

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;

    @Autowired
    public RecordHandler(RecordRepository recordRepository, UserRepository userRepository) {
        this.recordRepository = recordRepository;
        this.userRepository = userRepository;
    }

    public Mono<ServerResponse> save(ServerRequest request) {
        Flux<User> userFlux = request.bodyToMono(Record.class)
                .flatMap(this.recordRepository::insert)
                .flux()
                .flatMap(record -> this.userRepository.findById(request.queryParam("uid").orElse(""))
                        .flatMap(user -> {
                            user.setRecords(Collections.singletonList(record));
                            return this.userRepository.save(user);
                        }));
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(userFlux, User.class);
    }

    public Mono<ServerResponse> records(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.recordRepository.findAll(), Record.class);
    }

    public Mono<ServerResponse> delete(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.recordRepository.deleteById(request.pathVariable("id")), Void.class);
    }


}
