import { useParams } from "react-router";
import ModifyComponent from "../../components/products/modifyComponent";
import PendingModal from "../../components/common/pendingModal";
import useProductQuery from "../../hooks/useProductQuery";

function ModifyPage() {
    const { pno } = useParams();
    const { data: product, isPending } = useProductQuery(pno);

    return (
        <div className="w-full bg-white p-4">
            {isPending && <PendingModal />}
            <div className="text-3xl font-extrabold">Products Modify Page</div>
            {product && <ModifyComponent product={product} />}
        </div>
    );
}

export default ModifyPage;