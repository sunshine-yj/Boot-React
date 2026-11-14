import { useSearchParams } from "react-router";

function ListPage() {
    const [queryParams] = useSearchParams();
    const page = queryParams.get("page"); // string | null
    const size = queryParams.get("size");

    return (
        <div className="w-full bg-white">
            <div className="text-4xl">Todo List Page {page} {size}</div>
        </div>
    );
}

export default ListPage;