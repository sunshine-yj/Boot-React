import { useLoaderData } from "react-router";
import ListComponent from "../../components/products/listComponent";

function ListPage() {
    const pageResponse = useLoaderData() as PageResponseDTO<ProductDTO>;

    return (
        <div className="mt-4 w-full border border-neutral-300 shadow-md">
            <div className="m-4 text-2xl font-extrabold">Products List Page</div>
            <ListComponent serverData={pageResponse} />
        </div>
    );
}

export default ListPage;