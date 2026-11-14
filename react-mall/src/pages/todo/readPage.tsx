import { useParams } from "react-router";
import ReadComponent from "../../components/todo/readComponent";

function ReadPage() {
    const { tno } = useParams();

    return (
        <div className="mt-6 w-full bg-white font-extrabold">
            <div className="text-2xl">Todo Read Page {tno}</div>
            <ReadComponent tno={Number(tno)} />
        </div>
    );
}

export default ReadPage;