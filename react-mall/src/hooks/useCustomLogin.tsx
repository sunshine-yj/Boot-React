import { Navigate, useNavigate } from "react-router";
import useZustandMember from "../zstore/useZustandMember";
import useZustandCart from "../zstore/useZustandCart";

function useCustomLogin() {
    const navigate = useNavigate();
    const { member, status, login, logout } = useZustandMember();
    const clearCart = useZustandCart((s) => s.clear);

    const loginState = member;
    const loginStatus = status;
    const isLogin = !!member.email;

    const doLogin = (email: string, pw: string) => login(email, pw);
    const doLogout = () => {
        clearCart();
        logout();
    };

    const moveToLogin = () => navigate("/member/login");
    const moveToLoginReturn = () => <Navigate replace to="/member/login" />;
    const moveToPath = (path: string) => navigate({ pathname: path }, { replace: true });

    return { loginState, loginStatus, isLogin, doLogin, doLogout, moveToLogin, moveToLoginReturn, moveToPath };
}

export default useCustomLogin;