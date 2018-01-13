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
        return ServerResponse.ok().contentType(APPLICATION_JSON)
                .body(this.userRepository.findById(request.pathVariable("id")), User.class);
    }

    public Mono<ServerResponse> findUserByName(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON)
                .body(this.userRepository.findByName(String.valueOf(request.queryParam("name").orElse("")))
                        , User.class);
    }

    public Mono<ServerResponse> login(ServerRequest request) {
        Mono<User> userMono = request.bodyToMono(User.class)
                .flatMap(user ->
                        this.userRepository.findByEmailAndMasterPassword(user.getEmail(), user.getMasterPassword()));
        userMono.hasElement().doOnNext(aBoolean -> {
            if (aBoolean) {
                userMono.doOnNext(User::buildToken);
            }
        });
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(userMono, User.class);
    }

    public Mono<ServerResponse> users(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON)
                .body(this.userRepository.findAll(), User.class);
    }

    public Mono<ServerResponse> save(ServerRequest request) {
        Mono<User> user = request.bodyToMono(User.class);
        return ServerResponse.ok().contentType(APPLICATION_JSON)
                .body(this.userRepository.insert(user).last(), User.class);
    }

    public Mono<ServerResponse> delete(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON)
                .body(this.userRepository.deleteById(request.pathVariable("id")), Void.class);
    }

}
