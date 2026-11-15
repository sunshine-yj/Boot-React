import LogoutComponent from "../../components/member/logoutComponent";
import BasicMenu from "../../components/menus/basicMenu";

function LogoutPage() {
    return (
        <div className="fixed inset-0 flex flex-col">
            <BasicMenu />
            <div className="flex h-full w-full items-center justify-center">
                <LogoutComponent />
            </div>
        </div>
    );
}

export default LogoutPage;