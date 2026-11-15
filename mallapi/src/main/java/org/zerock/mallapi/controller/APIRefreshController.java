package org.zerock.mallapi.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.mallapi.util.CustomJWTException;
import org.zerock.mallapi.util.JWTUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
public class APIRefreshController {

    @RequestMapping("/api/member/refresh")
    public Map<String, Object> refresh(
            @RequestHeader(name = "Authorization", required = false) String authHeader,
            @RequestParam(name = "refreshToken", required = false) String refreshToken) {

        if (refreshToken == null) throw new CustomJWTException("NULL_REFRESH");
        if (authHeader == null || authHeader.length() < 7) throw new CustomJWTException("INVALID_STRING");

        String accessToken = authHeader.substring(7);

        if (!isExpired(accessToken)) {
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        }

        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);

        String newAccess = JWTUtil.generateToken(claims, 10);
        String newRefresh = lessThanOneHour((Integer) claims.get("exp"))
                ? JWTUtil.generateToken(claims, 60 * 24)
                : refreshToken;

        return Map.of("accessToken", newAccess, "refreshToken", newRefresh);
    }

    private boolean lessThanOneHour(Integer exp) {
        long leftMillis = new Date((long) exp * 1000).getTime() - System.currentTimeMillis();
        return leftMillis / (1000 * 60) < 60;
    }

    private boolean isExpired(String token) {
        try {
            JWTUtil.validateToken(token);
        } catch (CustomJWTException e) {
            return "Expired".equals(e.getMessage());
        }
        return false;
    }
}