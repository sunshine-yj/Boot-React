import { Outlet, useNavigate } from "react-router";

function IndexPage() {
    const navigate = useNavigate();

    const moveToList = () => navigate({ pathname: "list" });
    const moveToAdd = () => navigate({ pathname: "add" });

    const btn = "m-1 w-20 cursor-pointer p-2 text-center text-xl font-extrabold underline";

    return (
        <div>
            <div className="m-2 flex w-full p-2">
                <div className={btn} onClick={moveToList}>LIST</div>
                <div className={btn} onClick={moveToAdd}>ADD</div>
            </div>
            <div className="flex w-full flex-wrap">
                <Outlet />
            </div>
        </div>
    );
}

export default IndexPage;