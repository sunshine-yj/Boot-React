import { useState, type ChangeEvent, type ReactNode } from "react";
import { postAdd } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/resultModal";

const initState: TodoAdd = { title: "", writer: "", dueDate: "" };

const inputClass = "w-4/5 rounded border border-neutral-400 p-4 shadow-sm";

function AddComponent() {
    const [todo, setTodo] = useState<TodoAdd>({ ...initState });
    const [result, setResult] = useState<number | null>(null);
    const { moveToList } = useCustomMove();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTodo((prev) => ({ ...prev, [name]: value }));
    };

    const handleClickAdd = () => {
        postAdd(todo)
            .then((data) => {
                setResult(data.TNO);
                setTodo({ ...initState });
            })
            .catch((e) => console.error(e));
    };

    const closeModal = () => {
        setResult(null);
        moveToList();
    };

    return (
        <div className="m-2 mt-10 border-2 border-sky-200 p-4">
            {result !== null && (
                <ResultModal title="Add Result" content={`New ${result} Added`} callbackFn={closeModal} />
            )}

            <Field label="TITLE">
                <input className={inputClass} name="title" type="text" value={todo.title} onChange={handleChange} />
            </Field>

            <Field label="WRITER">
                <input className={inputClass} name="writer" type="text" value={todo.writer} onChange={handleChange} />
            </Field>

            <Field label="DUEDATE">
                <input className={inputClass} name="dueDate" type="date" value={todo.dueDate} onChange={handleChange} />
            </Field>

            <div className="flex justify-end p-4">
                <button type="button" className="w-36 rounded bg-blue-500 p-4 text-xl text-white" onClick={handleClickAdd}>
                    ADD
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

export default AddComponent;