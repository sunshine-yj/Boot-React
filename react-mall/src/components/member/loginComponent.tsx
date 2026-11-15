import { useState, type FormEvent } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModal from "../common/resultModal";

const inputClass = "w-full rounded border border-neutral-500 p-4 shadow-sm";

function LoginComponent() {
    const { loginStatus, isLogin, doLogin, moveToPath } = useCustomLogin();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        doLogin(email, pw);
    };

    return (
        <div className="m-2 mt-10 w-[min(560px,92vw)] border-2 border-sky-200 p-6">
            {loginStatus === "pending" && <div className="bg-amber-300 p-2">로그인 중...</div>}
            {loginStatus === "rejected" && <div className="bg-red-300 p-2">로그인 실패: 이메일/비밀번호 확인</div>}
            {loginStatus === "fulfilled" && isLogin && (
                <ResultModal title="Login Result" content="로그인되었습니다." callbackFn={() => moveToPath("/")} />
            )}

            <div className="p-4 text-center text-4xl font-extrabold text-blue-500">Login</div>

            <form onSubmit={handleSubmit} className="grid gap-4">
                <label className="grid gap-2 font-bold">
                    Email
                    <input className={inputClass} name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="grid gap-2 font-bold">
                    Password
                    <input className={inputClass} name="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
                </label>
                <div className="flex justify-center">
                    <button type="submit" className="w-36 rounded bg-blue-500 p-4 text-xl text-white">LOGIN</button>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;