package com.yuicon.memo.handler;

import com.yuicon.memo.domain.Record;
import com.yuicon.memo.repository.RecordRepository;
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
public class RecordHandler {

    private final RecordRepository recordRepository;

    @Autowired
    public RecordHandler(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public Mono<ServerResponse> save(ServerRequest request) {
        Mono<Record> passwordRecordMono = request.bodyToMono(Record.class);
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.recordRepository.insert(passwordRecordMono), Record.class);
    }

    public Mono<ServerResponse> records(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.recordRepository.findAll(), Record.class);
    }

    public Mono<ServerResponse> delete(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.recordRepository.deleteById(request.pathVariable("id")), Void.class);
    }



}
