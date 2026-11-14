import { NavLink } from "react-router";

const menus = [
    { to: "/", label: "Main" },
    { to: "/about", label: "About" },
    { to: "/todo/", label: "Todo" },
];

function BasicMenu() {
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
        </nav>
    );
}

export default BasicMenu;