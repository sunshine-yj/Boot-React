import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../../api/productsApi";
import ListComponent from "../../components/products/listComponent";
import PendingModal from "../../components/common/pendingModal";
import useCustomMove from "../../hooks/useCustomMove";

function ListPage() {
    const { page, size } = useCustomMove();

    const { data, isPending, error } = useQuery({
        queryKey: ["products/list", page, size],
        queryFn: () => getProductList({ page, size }),
        staleTime: 1000 * 60,
    });

    return (
        <div className="mt-4 w-full border border-neutral-300 shadow-md">
            {isPending && <PendingModal />}
            <div className="m-4 text-2xl font-extrabold">Products List Page</div>
            {error && <div className="p-4 text-red-600">목록을 불러오지 못했습니다.</div>}
            {data && <ListComponent serverData={data} />}
        </div>
    );
}

export default ListPage;