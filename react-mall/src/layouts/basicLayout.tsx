import { Outlet } from "react-router";
import BasicMenu from "../components/menus/basicMenu";
import CartComponent from "../components/menus/cartComponent";

function BasicLayout() {
    return (
        <>
            <BasicMenu />

            <div className="my-5 flex w-full flex-col gap-4 md:flex-row">
                <main className="bg-sky-300 px-5 py-5 md:w-3/4">
                    <Outlet />
                </main>
                <aside className="bg-green-300 px-5 py-5 md:w-1/4">
                    <CartComponent />
                </aside>
            </div>
        </>
    );
}

export default BasicLayout;