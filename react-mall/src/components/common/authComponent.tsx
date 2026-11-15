import type { ReactNode } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";

function AuthComponent({ children }: { children: ReactNode }) {
    const { isLogin, moveToLoginReturn } = useCustomLogin();

    if (!isLogin) return moveToLoginReturn();
    return <>{children}</>;
}

export default AuthComponent;