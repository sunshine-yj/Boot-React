interface UseCustomMoveReturn {
    moveToList: (pageParam?: PageParam) => void;
    moveToModify: (tno: number) => void;
    moveToRead: (tno: number) => void;
    page: number;
    size: number;
    refresh: boolean;
}

interface ResultModalProps {
    title: string;
    content: string;
    callbackFn?: () => void;
}