import { useParams } from "react-router";
import ModifyComponent from "../../components/todo/modifyComponent";

function ModifyPage() {
    const { tno } = useParams();

    return (
        <div className="w-full bg-white p-4">
            <div className="text-3xl font-extrabold">Todo Modify Page</div>
            <ModifyComponent tno={Number(tno)} />
        </div>
    );
}

export default ModifyPage;