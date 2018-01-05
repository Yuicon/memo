package com.yuicon.memo.handler;

import com.yuicon.memo.domain.PasswordRecord;
import com.yuicon.memo.repository.PasswordRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.http.MediaType.APPLICATION_JSON;

/**
 * @author Yuicon
 */
@Component
public class PasswordRecordHandler {

    private final PasswordRecordRepository passwordRecordRepository;

    @Autowired
    public PasswordRecordHandler(PasswordRecordRepository passwordRecordRepository) {
        this.passwordRecordRepository = passwordRecordRepository;
    }

    public Mono<ServerResponse> save(ServerRequest request) {
        Mono<PasswordRecord> passwordRecordMono = request.bodyToMono(PasswordRecord.class);
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.passwordRecordRepository.insert(passwordRecordMono), PasswordRecord.class);
    }

    public Mono<ServerResponse> passwordRecords(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.passwordRecordRepository.findAll(), PasswordRecord.class);
    }

    public Mono<ServerResponse> delete(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.passwordRecordRepository.deleteById(request.pathVariable("id")), Void.class);
    }



}
