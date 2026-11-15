package org.zerock.mallapi.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.zerock.mallapi.dto.MemberDTO;
import org.zerock.mallapi.util.JWTUtil;

import com.google.gson.Gson;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        if ("OPTIONS".equals(request.getMethod())) return true;

        String path = request.getRequestURI();
        if (path.startsWith("/api/member/")) return true;
        if (path.startsWith("/api/products/view/")) return true;
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        try {
            String accessToken = authHeader.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);

            @SuppressWarnings("unchecked")
            List<String> roleNames = (List<String>) claims.get("roleNames");
            MemberDTO memberDTO = new MemberDTO(
                    (String) claims.get("email"),
                    (String) claims.get("pw"),
                    (String) claims.get("nickname"),
                    (Boolean) claims.get("social"),
                    roleNames);

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(memberDTO, memberDTO.getPw(), memberDTO.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.error("JWT check error: {}", e.getMessage());

            response.setContentType("application/json");
            try (PrintWriter out = response.getWriter()) {
                out.println(new Gson().toJson(Map.of("error", "ERROR_ACCESS_TOKEN")));
            }
        }
    }
}