package org.zerock.mallapi.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.zerock.mallapi.domain.Member;
import org.zerock.mallapi.domain.MemberRole;
import org.zerock.mallapi.dto.MemberDTO;
import org.zerock.mallapi.dto.MemberModifyDTO;
import org.zerock.mallapi.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAccessToken(accessToken);
        log.info("kakao email: {}", email);

        Optional<Member> result = memberRepository.findById(email);
        if (result.isPresent()) {
            return entityToDTO(result.get());
        }

        Member socialMember = makeSocialMember(email);
        memberRepository.save(socialMember);
        return entityToDTO(socialMember);
    }

    @Override
    public void modifyMember(MemberModifyDTO dto) {
        Member member = memberRepository.findById(dto.getEmail()).orElseThrow();
        member.changePw(passwordEncoder.encode(dto.getPw()));
        member.changeSocial(false);
        member.changeNickname(dto.getNickname());
        memberRepository.save(member);
    }

    @SuppressWarnings("unchecked")
    private String getEmailFromKakaoAccessToken(String accessToken) {
        if (accessToken == null) throw new RuntimeException("Access Token is null");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");

        ResponseEntity<Map> response = new RestTemplate().exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Map.class);

        Map<String, Object> body = response.getBody();
        log.info(body);

        Map<String, Object> kakaoAccount = (Map<String, Object>) body.get("kakao_account");
        return (String) kakaoAccount.get("email");
    }

    private Member makeSocialMember(String email) {
        Member member = Member.builder()
                .email(email)
                .pw(passwordEncoder.encode(makeTempPassword()))
                .nickname("소셜회원")
                .social(true)
                .build();
        member.addRole(MemberRole.USER);
        return member;
    }

    private String makeTempPassword() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            sb.append((char) ((int) (Math.random() * 55) + 65));
        }
        return sb.toString();
    }
}