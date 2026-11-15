import useCustomLogin from "../../hooks/useCustomLogin";

function LogoutComponent() {
    const { doLogout, moveToPath } = useCustomLogin();

    const handleLogout = () => {
        doLogout();
        moveToPath("/");
    };

    return (
        <div className="m-2 mt-10 border-2 border-red-200 p-6 text-center">
            <div className="p-4 text-4xl font-extrabold text-red-500">Logout</div>
            <button type="button" className="w-36 rounded bg-red-500 p-4 text-xl text-white" onClick={handleLogout}>
                LOGOUT
            </button>
        </div>
    );
}

export default LogoutComponent;