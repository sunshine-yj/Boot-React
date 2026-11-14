import { useParams } from "react-router";

function ReadPage() {
    const { tno } = useParams();

    return (
        <div className="w-full bg-white">
            <div className="text-4xl">Todo Read Page {tno}</div>
        </div>
    );
}

export default ReadPage;