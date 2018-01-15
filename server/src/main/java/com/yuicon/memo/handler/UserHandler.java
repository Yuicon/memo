package com.yuicon.memo.handler;

import com.yuicon.memo.domain.User;
import com.yuicon.memo.repository.UserRepository;
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
public class UserHandler {


    private final UserRepository userRepository;

    @Autowired
    public UserHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Mono<ServerResponse> user(ServerRequest request) {
        return this.userRepository.findById(request.pathVariable("id"))
                .flatMap(user -> ServerResponse.ok().contentType(APPLICATION_JSON).body(Mono.just(user), User.class))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> findUserByName(ServerRequest request) {
        return this.userRepository.findByName(String.valueOf(request.queryParam("name").orElse("")))
                .flatMap(user -> ServerResponse.ok().contentType(APPLICATION_JSON).body(Mono.just(user), User.class))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> login(ServerRequest request) {
        return request.bodyToMono(User.class)
                .flatMap(user ->
                        this.userRepository.findByEmailAndMasterPassword(user.getEmail(), user.getMasterPassword()))
                .doOnNext(User::buildToken)
                .flatMap(user -> ServerResponse.ok().contentType(APPLICATION_JSON).body(Mono.just(user), User.class))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> users(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON)
                .body(this.userRepository.findAll(), User.class);
    }

    public Mono<ServerResponse> save(ServerRequest request) {
        return request.bodyToMono(User.class)
                .flatMap(this.userRepository::insert)
                .doOnNext(User::buildToken)
                .flatMap(user -> ServerResponse.ok().contentType(APPLICATION_JSON).body(Mono.just(user), User.class))
                .switchIfEmpty(ServerResponse.unprocessableEntity().build());
    }

    public Mono<ServerResponse> delete(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON)
                .body(this.userRepository.deleteById(request.pathVariable("id")), Void.class);
    }

}
