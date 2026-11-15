package org.zerock.mallapi.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
public class MemberDTO extends User {

    private String email;
    private String pw;
    private String nickname;
    private boolean social;
    private List<String> roleNames = new ArrayList<>();

    public MemberDTO(String email, String pw, String nickname, boolean social, List<String> roleNames) {
        super(email, pw, roleNames.stream()
                .map(r -> new SimpleGrantedAuthority("ROLE_" + r))
                .toList());
        this.email = email;
        this.pw = pw;
        this.nickname = nickname;
        this.social = social;
        this.roleNames = roleNames;
    }

    public Map<String, Object> getClaims() {
        Map<String, Object> map = new HashMap<>();
        map.put("email", email);
        map.put("pw", pw);
        map.put("nickname", nickname);
        map.put("social", social);
        map.put("roleNames", roleNames);
        return map;
    }
}
