import { useEffect, useState } from "react";
import { getOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState: Todo = { tno: 0, title: "", writer: "", dueDate: null, complete: false };

function ReadComponent({ tno }: { tno: number }) {
    const [todo, setTodo] = useState<Todo>(initState);
    const { moveToList, moveToModify } = useCustomMove();

    useEffect(() => {
        getOne(tno).then((data) => {
            console.log(data);
            setTodo(data);
        });
    }, [tno]);

    return (
        <div className="m-2 mt-10 border-2 border-sky-200 p-4 text-xl">
            <Row label="Tno" value={todo.tno} />
            <Row label="Writer" value={todo.writer} />
            <Row label="Title" value={todo.title} />
            <Row label="Due Date" value={todo.dueDate ?? ""} />
            <Row label="Complete" value={todo.complete ? "Completed" : "Not Yet"} />
            <div className="flex justify-end gap-2 p-4">
                <button
                    type="button"
                    className="w-32 rounded bg-blue-500 p-3 text-white"
                    onClick={() => moveToList()} >
                    List
                </button>
                <button
                    type="button"
                    className="w-32 rounded bg-red-500 p-3 text-white"
                    onClick={() => moveToModify(tno)} >
                    Modify
                </button>
            </div>
        </div>
    );
}

// 라벨 + 값 한 줄 (교안의 makeDiv)
function Row({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="mb-3 flex w-full">
            <div className="w-1/5 p-4 text-right font-bold">{label}</div>
            <div className="w-4/5 rounded border p-4 shadow-sm">{value}</div>
        </div>
    );
}

export default ReadComponent;