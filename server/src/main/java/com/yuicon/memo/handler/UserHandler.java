package com.yuicon.memo.handler;

import com.yuicon.memo.domain.User;
import com.yuicon.memo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.TEXT_PLAIN;
import static org.springframework.web.reactive.function.BodyInserters.fromObject;

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

    public Mono<ServerResponse> getUser(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.userRepository.findById(request.pathVariable("id")), User.class);
    }

    public Mono<ServerResponse> getUsers(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.userRepository.findAll(), User.class);
    }

    public Mono<ServerResponse> saveUser(ServerRequest request) {
        Mono<User> user = request.bodyToMono(User.class);
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.userRepository.insert(user), User.class);
    }

    public Mono<ServerResponse> deleteUser(ServerRequest request) {
        return ServerResponse.ok().contentType(APPLICATION_JSON).body(this.userRepository.deleteById(request.pathVariable("id")), Void.class);
    }

}
