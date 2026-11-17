import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/productsApi";

function useProductQuery(pno: string | undefined) {
    return useQuery({
        queryKey: ["product", pno],
        queryFn: () => getProduct(pno!),
        enabled: !!pno,
        staleTime: 1000 * 60 * 60 * 24,
    });
}

export default useProductQuery;