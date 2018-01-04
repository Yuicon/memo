package com.yuicon.memo.route;

import com.yuicon.memo.handler.UserHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

/**
 * @author Yuicon
 */
@Configuration
public class UserRoute {

    @Bean
    public RouterFunction<ServerResponse> monoRouterFunction(UserHandler userHandler) {
        return route(GET("/users").and(accept(APPLICATION_JSON)), userHandler::getUsers)
                .andRoute(POST("/user").and(accept(APPLICATION_JSON)), userHandler::saveUser)
                .andRoute(GET("/user/{id}").and(accept(APPLICATION_JSON)), userHandler::getUser)
                .andRoute(DELETE("/user/{id}").and(accept(APPLICATION_JSON)), userHandler::deleteUser);
    }

}
