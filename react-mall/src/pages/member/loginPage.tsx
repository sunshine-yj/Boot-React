import LoginComponent from "../../components/member/loginComponent";
import BasicMenu from "../../components/menus/basicMenu";

function LoginPage() {
    return (
        <div className="fixed inset-0 flex flex-col">
            <BasicMenu />
            <div className="flex h-full w-full items-center justify-center">
                <LoginComponent />
            </div>
        </div>
    );
}

export default LoginPage;