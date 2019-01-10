package com.yuicon.memo.web;

import com.google.gson.Gson;
import com.yuicon.memo.domain.Record;
import com.yuicon.memo.repository.RecordRepository;
import model.User;
import model.vo.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.time.LocalDateTime;

/**
 * @author Yuicon
 */
@RestController
public class RecordController {

    private final RecordRepository recordRepository;
    private final Gson gson = new Gson();

    @Autowired
    public RecordController(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @PostMapping("records")
    public Mono<JsonResponse> insert(@RequestBody Record record, @RequestHeader("user") String userString) throws UnsupportedEncodingException {
        System.out.println(URLDecoder.decode(userString,"UTF-8"));
        User user = gson.fromJson(URLDecoder.decode(userString,"UTF-8"), User.class);
        record.setUid(user.getId());
        record.setCreateTime(LocalDateTime.now());
        return Mono.justOrEmpty(JsonResponse.success("创建成功", recordRepository.insert(record)));
    }

    @GetMapping("records")
    public Mono<JsonResponse> findAll(@RequestHeader("user") String userString) throws UnsupportedEncodingException {
        User user = gson.fromJson(URLDecoder.decode(userString,"UTF-8"), User.class);
        return Mono.justOrEmpty(JsonResponse.success(recordRepository.findByUid(user.getId())));
    }

}
