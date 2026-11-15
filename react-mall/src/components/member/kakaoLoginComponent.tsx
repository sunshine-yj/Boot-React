import { getKakaoLoginLink } from "../../api/kakaoApi";

function KakaoLoginComponent() {
    return (
        <div className="mt-4 flex flex-col items-center gap-2">
            <div className="text-blue-500">로그인 시에 자동 가입 처리됩니다</div>
            <a
                href={getKakaoLoginLink()}
                className="w-3/4 rounded bg-yellow-400 p-3 text-center text-2xl font-extrabold text-black shadow-sm">
                KAKAO LOGIN
            </a>
        </div>
    );
}

export default KakaoLoginComponent;