package org.zerock.mallapi.util;

import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTUtil {

    private static final String KEY = "1234567890123456789012345678901234567890";

    private static SecretKey secretKey() {
        return Keys.hmacShaKeyFor(KEY.getBytes(StandardCharsets.UTF_8));
    }

    public static String generateToken(Map<String, Object> valueMap, int min) {
        ZonedDateTime now = ZonedDateTime.now();
        return Jwts.builder()
                .setHeader(Map.of("typ", "JWT"))
                .setClaims(valueMap)
                .setIssuedAt(Date.from(now.toInstant()))
                .setExpiration(Date.from(now.plusMinutes(min).toInstant()))
                .signWith(secretKey())
                .compact();
    }

    public static Map<String, Object> validateToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (MalformedJwtException e) {
            throw new CustomJWTException("MalFormed");
        } catch (ExpiredJwtException e) {
            throw new CustomJWTException("Expired");
        } catch (InvalidClaimException e) {
            throw new CustomJWTException("Invalid");
        } catch (JwtException e) {
            throw new CustomJWTException("JWTError");
        } catch (Exception e) {
            throw new CustomJWTException("Error");
        }
    }
}