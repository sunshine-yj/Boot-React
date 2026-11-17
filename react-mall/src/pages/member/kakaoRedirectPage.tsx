import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { save } from "../../slices/loginSlice";
import type { AppDispatch } from "../../store";
import useZustandMember from "../../zstore/useZustandMember";


function KakaoRedirectPage() {
    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const save = useZustandMember((s) => s.save);

    useEffect(() => {
        if (!authCode) return;

        getAccessToken(authCode)
            .then((kakaoToken) => getMemberWithAccessToken(kakaoToken))
            .then((memberInfo) => {
                save(memberInfo);
                navigate(memberInfo.social ? "/member/modify" : "/", { replace: true });
            })
            .catch((e) => {
                console.error(e);
                navigate("/member/login", { replace: true });
            });
    }, [authCode, dispatch, navigate]);

    return <div className="p-10 text-2xl">카카오 로그인 처리 중...</div>;
}

export default KakaoRedirectPage;