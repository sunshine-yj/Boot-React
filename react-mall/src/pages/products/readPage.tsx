import { useParams } from "react-router";
import ReadComponent from "../../components/products/readComponent";
import PendingModal from "../../components/common/pendingModal";
import useProductQuery from "../../hooks/useProductQuery";

function ReadPage() {
    const { pno } = useParams();
    const { data: product, isPending } = useProductQuery(pno);

    return (
        <div className="w-full">
            {isPending && <PendingModal />}
            <div className="p-2 text-2xl font-extrabold">Product Read</div>
            {product && <ReadComponent product={product} />}
        </div>
    );
}

export default ReadPage;