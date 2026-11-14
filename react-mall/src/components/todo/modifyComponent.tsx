import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/resultModal";

const initState: Todo = { tno: 0, title: "", writer: "", dueDate: null, complete: false };
const boxClass = "w-4/5 rounded border p-4 shadow-sm";

function ModifyComponent({ tno }: { tno: number }) {
    const [todo, setTodo] = useState<Todo>({ ...initState });
    const [result, setResult] = useState<"Modified" | "Deleted" | null>(null);
    const { moveToList, moveToRead } = useCustomMove();

    useEffect(() => {
        getOne(tno).then((data) => setTodo(data));
    }, [tno]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTodo((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeComplete = (e: ChangeEvent<HTMLSelectElement>) => {
        const complete = e.target.value === "Y";
        setTodo((prev) => ({ ...prev, complete }));
    };

    const handleClickModify = () => {
        const body: TodoModify = { tno: todo.tno, title: todo.title, dueDate: todo.dueDate, complete: todo.complete };
        putOne(body).then(() => setResult("Modified"));
    };

    const handleClickDelete = () => {
        deleteOne(tno).then(() => setResult("Deleted"));
    };

    const closeModal = () => {
        if (result === "Deleted") moveToList();
        else moveToRead(tno);
    };

    return (
        <div className="m-2 mt-10 border-2 border-sky-200 p-4">
            {result && <ResultModal title="처리 결과" content={result} callbackFn={closeModal} />}

            <Field label="TNO"><div className={`${boxClass} bg-gray-100`}>{todo.tno}</div></Field>

            <Field label="WRITER"><div className={`${boxClass} bg-gray-100`}>{todo.writer}</div></Field>

            <Field label="TITLE">
                <input className={boxClass} name="title" type="text" value={todo.title} onChange={handleChange} />
            </Field>

            <Field label="DUEDATE">
                <input className={boxClass} name="dueDate" type="date" value={todo.dueDate ?? ""} onChange={handleChange} />
            </Field>

            <Field label="COMPLETE">
                <select className="rounded border-2 p-2" value={todo.complete ? "Y" : "N"} onChange={handleChangeComplete}>
                    <option value="Y">Completed</option>
                    <option value="N">Not Yet</option>
                </select>
            </Field>

            <div className="flex justify-end gap-2 p-4">
                <button type="button" className="w-32 rounded bg-red-500 p-3 text-xl text-white" onClick={handleClickDelete}>
                    Delete
                </button>

                <button type="button" className="w-32 rounded bg-blue-500 p-3 text-xl text-white" onClick={handleClickModify}>
                    Modify
                </button>
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="mb-4 flex w-full items-center">
            <div className="w-1/5 p-4 text-right font-bold">{label}</div>
            {children}
        </div>
    );
}

export default ModifyComponent;