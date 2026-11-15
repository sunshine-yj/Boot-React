import ModifyComponent from "../../components/member/modifyComponent";
import BasicMenu from "../../components/menus/basicMenu";

function ModifyPage() {
    return (
        <>
            <BasicMenu />
            <main className="mx-auto my-5 max-w-3xl bg-sky-100 p-5">
                <div className="text-3xl">Member Modify Page</div>
                <div className="mt-4 bg-white p-2">
                    <ModifyComponent />
                </div>
            </main>
        </>
    );
}

export default ModifyPage;