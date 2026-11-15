package org.zerock.mallapi.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.zerock.mallapi.security.filter.JWTCheckFilter;
import org.zerock.mallapi.security.handler.APILoginFailHandler;
import org.zerock.mallapi.security.handler.APILoginSuccessHandler;
import org.zerock.mallapi.security.handler.CustomAccessDeniedHandler;

import java.util.List;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity
public class CustomSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("---------- security config ----------");

        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        http.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.csrf(csrf -> csrf.disable());

        http.formLogin(config -> {
            config.loginPage("/api/member/login");
            config.successHandler(new APILoginSuccessHandler());
            config.failureHandler(new APILoginFailHandler());
        });
        http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling(config -> config.accessDeniedHandler(new CustomAccessDeniedHandler()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}