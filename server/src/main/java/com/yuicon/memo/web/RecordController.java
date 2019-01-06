package com.yuicon.memo.web;

import com.yuicon.memo.domain.Record;
import com.yuicon.memo.repository.RecordRepository;
import model.vo.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

/**
 * @author Yuicon
 */
@RestController("records")
public class RecordController {

    private final RecordRepository recordRepository;

    @Autowired
    public RecordController(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @PostMapping()
    public Mono<JsonResponse> insert(@RequestBody Record record) {
        return Mono.justOrEmpty(JsonResponse.success("创建成功", recordRepository.insert(record)));
    }

    @GetMapping()
    public Mono<JsonResponse> findAll(@RequestBody int uid) {
        return Mono.justOrEmpty(JsonResponse.success(recordRepository.findByUid(uid)));
    }

}
