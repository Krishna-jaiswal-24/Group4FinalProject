package com.ashishhiggins.gateeaw_new.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean

    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/** ")
                        .authenticated()
                        .pathMatchers("/api/**")
                        .authenticated()
                        .pathMatchers("/myCourses/**")
                        .authenticated()

                        .anyExchange().permitAll()


                )

                .oauth2Login(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    WebFilter writeableHeaders() {
        return (exchange, chain) -> {
            HttpHeaders writeableHeaders = HttpHeaders.writableHttpHeaders(
                    exchange.getRequest().getHeaders());
            ServerHttpRequestDecorator writeableRequest = new ServerHttpRequestDecorator(
                    exchange.getRequest()) {
                @Override
                public HttpHeaders getHeaders() {
                    return writeableHeaders;
                }
            };
            ServerWebExchange writeableExchange = exchange.mutate()
                    .request(writeableRequest)
                    .build();
            return chain.filter(writeableExchange);
        };
    }
}
