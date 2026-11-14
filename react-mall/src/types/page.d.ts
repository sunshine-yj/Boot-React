interface PageParam {
    page?: string | number;
    size?: string | number;
}

interface PageRequestDTO {
    page: number;
    size: number;
}

interface PageResponseDTO<T> {
    dtoList: T[];
    pageNumList: number[];
    pageRequestDTO: PageRequestDTO | null;
    prev: boolean;
    next: boolean;
    totalCount: number;
    prevPage: number;
    nextPage: number;
    totalPage: number;
    current: number;
}