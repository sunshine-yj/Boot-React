import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../store";
import { loginPostAsync, logout } from "../slices/loginSlice";

function useCustomLogin() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const loginState = useSelector((state: RootState) => state.loginSlice);
    const loginStatus = loginState.status;
    const isLogin = !!loginState.email;

    const doLogin = (email: string, pw: string) => dispatch(loginPostAsync({ email, pw }));
    const doLogout = () => dispatch(logout());

    const moveToLogin = () => navigate("/member/login");
    const moveToLoginReturn = () => <Navigate replace to="/member/login" />;
    const moveToPath = (path: string) => navigate({ pathname: path }, { replace: true });

    return { loginState, loginStatus, isLogin, doLogin, doLogout, moveToLogin, moveToLoginReturn, moveToPath };
}

export default useCustomLogin;