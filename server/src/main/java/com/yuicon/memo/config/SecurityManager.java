package com.yuicon.memo.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.springframework.lang.NonNull;
import org.springframework.web.reactive.function.server.HandlerFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

/**
 * @author Yuicon
 */
public class SecurityManager {

    private static final String KEY = "key";

    private static final List<String> ALLOW_PATH_LIST = Arrays.asList("/login", "/signin");
    
    static Mono<ServerResponse> allowAccessTo(ServerRequest request, HandlerFunction<ServerResponse> next) {
        if (ALLOW_PATH_LIST.contains(request.path())) {
            return next.handle(request);
        }
        List<String> header = request.headers().header("Authorization");
        if (!header.isEmpty() && validateToken(header.get(0)).isPresent()) {
            return next.handle(request);
        }
        return ServerResponse.status(UNAUTHORIZED).build();
    }

    public static String buildToken(String subject) {
        return Jwts.builder()
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .setSubject(subject)
                .signWith(SignatureAlgorithm.HS512, KEY.getBytes())
                .compact();
    }

    public static Optional<String> validateToken(String token) {
        try {
            return Optional.of(Jwts.parser().setSigningKey(KEY.getBytes()).parseClaimsJws(token).getBody().getSubject());
        } catch (SignatureException e) {
            return Optional.empty();
        }
    }


}
