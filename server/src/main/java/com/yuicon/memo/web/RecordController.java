package com.yuicon.memo.web;

import com.google.gson.Gson;
import com.yuicon.memo.domain.Record;
import com.yuicon.memo.repository.RecordRepository;
import model.User;
import model.vo.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

/**
 * @author Yuicon
 */
@RestController("records")
public class RecordController {

    private final RecordRepository recordRepository;
    private final Gson gson = new Gson();

    @Autowired
    public RecordController(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @PostMapping()
    public Mono<JsonResponse> insert(@RequestBody Record record) {
        return Mono.justOrEmpty(JsonResponse.success("创建成功", recordRepository.insert(record)));
    }

    @GetMapping()
    public Mono<JsonResponse> findAll(@RequestHeader("user") String userString) {
        User user = gson.fromJson(userString, User.class);
        return Mono.justOrEmpty(JsonResponse.success(recordRepository.findByUid(user.getId())));
    }

}
