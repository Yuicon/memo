package com.yuicon.memo.web;

import com.yuicon.memo.domain.Item;
import com.yuicon.memo.repository.ItemRepository;
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
@RestController("items")
public class ItemController {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @PostMapping()
    public Mono<JsonResponse> insert(@RequestBody Item item) {
        return Mono.justOrEmpty(JsonResponse.success("创建成功", itemRepository.insert(item)));
    }

    @GetMapping()
    public Mono<JsonResponse> findAll(@RequestBody int recordId) {
        return Mono.justOrEmpty(JsonResponse.success(itemRepository.findByRecordId(recordId)));
    }

}
