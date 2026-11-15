package org.zerock.mallapi.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.zerock.mallapi.dto.MemberDTO;
import org.zerock.mallapi.dto.MemberModifyDTO;
import org.zerock.mallapi.service.MemberService;
import org.zerock.mallapi.util.JWTUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
public class SocialController {

    private final MemberService memberService;

    @GetMapping("/api/member/kakao")
    public Map<String, Object> getMemberFromKakao(@RequestParam(name = "accessToken") String accessToken) {
        MemberDTO memberDTO = memberService.getKakaoMember(accessToken);

        Map<String, Object> claims = memberDTO.getClaims();
        String jwtAccess = JWTUtil.generateToken(claims, 10);
        String jwtRefresh = JWTUtil.generateToken(claims, 60 * 24);
        claims.put("accessToken", jwtAccess);
        claims.put("refreshToken", jwtRefresh);
        return claims;
    }

    @PutMapping("/api/member/modify")
    public Map<String, String> modify(@RequestBody MemberModifyDTO memberModifyDTO) {
        log.info("member modify: {}", memberModifyDTO);
        memberService.modifyMember(memberModifyDTO);
        return Map.of("result", "modified");
    }
}