package com.yuicon.memo.config;

import com.yuicon.memo.handler.PasswordRecordHandler;
import com.yuicon.memo.handler.UserHandler;
import org.springframework.beans.factory.annotation.Autowired;
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
public class Route {

    private final UserHandler userHandler;
    private final PasswordRecordHandler passwordRecordHandler;

    @Autowired
    public Route(UserHandler userHandler, PasswordRecordHandler passwordRecordHandler) {
        this.passwordRecordHandler = passwordRecordHandler;
        this.userHandler = userHandler;
    }

    /**
     * 注册自定义RouterFunction
     */
    @Bean
    public RouterFunction<ServerResponse> restaurantRouter() {
        return route(GET("/users").and(accept(APPLICATION_JSON)), userHandler::getUsers)
                .and(route(POST("/user").and(accept(APPLICATION_JSON)), userHandler::saveUser))
                .andRoute(GET("/user/{id}").and(accept(APPLICATION_JSON)), userHandler::getUser)
                .andRoute(GET("/user").and(accept(APPLICATION_JSON)), userHandler::getUserByName)
                .andRoute(DELETE("/user/{id}").and(accept(APPLICATION_JSON)), userHandler::deleteUser)
                .andRoute(GET("/passwords").and(accept(APPLICATION_JSON)), passwordRecordHandler::passwordRecords)
                .andRoute(POST("/password").and(accept(APPLICATION_JSON)), passwordRecordHandler::save)
                .andRoute(DELETE("/password/{id}").and(accept(APPLICATION_JSON)), passwordRecordHandler::delete);
    }

}
