import { NavLink } from "react-router";
import useCustomLogin from "../../hooks/useCustomLogin";

const publicMenus = [
    { to: "/", label: "Main" },
    { to: "/about", label: "About" },
];

const memberMenus = [
    { to: "/todo/", label: "Todo" },
    { to: "/products/", label: "Products" },
];

function BasicMenu() {
    const { loginState, isLogin } = useCustomLogin();
    const menus = isLogin ? [...publicMenus, ...memberMenus] : publicMenus;

    return (
        <nav id="navbar" className="flex bg-blue-300">
            <div className="w-4/5 bg-gray-500">
                <ul className="flex p-4 font-bold text-white">
                    {menus.map((m) => (
                        <li key={m.to} className="pr-6 text-2xl">
                            <NavLink to={m.to}>{m.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex w-1/5 items-center justify-end gap-2 bg-orange-300 p-4 text-sm font-medium text-white">
                {isLogin ? (
                    <>
                        <span>{loginState.nickname} 님</span>
                        <NavLink to="/member/logout">Logout</NavLink>
                    </>
                ) : (
                    <NavLink to="/member/login">Login</NavLink>
                )}
            </div>
        </nav>
    );
}

export default BasicMenu;