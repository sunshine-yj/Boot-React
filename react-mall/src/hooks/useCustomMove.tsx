import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router";

const toNumber = (value: string | number | null | undefined, fallback: number) => {
    const n = Number(value);

    return Number.isFinite(n) && n > 0 ? n : fallback;
};

function useCustomMove(): UseCustomMoveReturn {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const [refresh, setRefresh] = useState(false);
    const page = toNumber(queryParams.get("page"), 1);
    const size = toNumber(queryParams.get("size"), 10);

    const queryDefault = createSearchParams({ page: String(page), size: String(size) }).toString();
    const moveToList = (pageParam?: PageParam) => {
        let queryStr = queryDefault;

        if (pageParam) {
            queryStr = createSearchParams({
                page: String(toNumber(pageParam.page, 1)),
                size: String(toNumber(pageParam.size, size)),
            }).toString();

            if (queryStr === queryDefault) setRefresh((r) => !r);
        }

        navigate({ pathname: "../list", search: queryStr });
    };

    const moveToModify = (tno: number) => {
        navigate({ pathname: `../modify/${tno}`, search: queryDefault });
    };

    const moveToRead = (tno: number) => {
        navigate({ pathname: `../read/${tno}`, search: queryDefault });
    };

    return { moveToList, moveToModify, moveToRead, page, size, refresh };
}

export default useCustomMove;