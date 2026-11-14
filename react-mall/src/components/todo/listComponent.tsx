import { useEffect, useState } from "react";
import { getList } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/pageComponent";

const initState: PageResponseDTO<Todo> = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

function ListComponent() {
    const { page, size, refresh, moveToList, moveToRead } =useCustomMove();
    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        getList({ page, size }).then((data) => {
            console.log(data);
            setServerData(data);
        });
    }, [page, size, refresh]);

    return (
        <div className="mx-2 mt-10 border-2 border-blue-100">
            <div className="flex flex-wrap justify-center p-6">
                {serverData.dtoList.map((todo) => (
                    <div
                        key={todo.tno}
                        className="m-2 w-full cursor-pointer rounded p-2 shadow-md hover:bg-blue-50"
                        onClick={() => moveToRead(todo.tno)}>
                        <div className="flex items-center">
                            <div className="w-1/12 p-2 text-2xl font-extrabold">{todo.tno}</div>
                            <div className="w-8/12 p-2 font-extrabold">{todo.title}</div>
                            <div className="w-3/12 p-2 text-right">{todo.dueDate}</div>
                        </div>
                    </div>
                ))}
            </div>
            <PageComponent serverData={serverData} movePage={moveToList} />
        </div>
    );
}

export default ListComponent;