import axios from "axios";
import { useActionState, type ReactNode } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import PendingModal from "../common/pendingModal";
import ResultModal from "../common/resultModal";

const initState: ProductAddResult = { result: 0 };

const addAsyncAction = async (_state: ProductAddResult, formData: FormData): Promise<ProductAddResult> => {
    const pname = formData.get("pname") as string;
    if (!pname) return { error: "Insert Product Name" };

    const res = await axios.post("http://localhost:8080/api/products/", formData);
    return { result: res.data.RESULT };
};
const inputClass = "w-4/5 rounded border border-neutral-300 p-4 shadow-sm";

function AddComponent() {
    const [state, action, isPending] = useActionState(addAsyncAction, initState);
    const { moveToList } = useCustomMove();

    return (
        <div className="m-2 mt-10 border-2 border-sky-200 p-4">
            {isPending && <PendingModal />}
            {!!state.result && (
                <ResultModal
                    title="상품 추가 결과"
                    content={`새로운 ${state.result}번 상품 추가됨`}
                    callbackFn={() => moveToList()}
                />
            )}
            {state.error && <div className="text-red-600">{state.error}</div>}

            <form action={action}>
                <Field label="Product Name"><input className={inputClass} name="pname" required /></Field>
                <Field label="Desc"><textarea className={`${inputClass} resize-y`} name="pdesc" rows={4} required /></Field>
                <Field label="Price"><input className={inputClass} name="price" type="number" required /></Field>
                <Field label="Files"><input className={inputClass} name="files" type="file" multiple accept="image/*" /></Field>

                <div className="flex justify-end p-4">
                    <button type="submit" className="w-36 rounded bg-blue-500 p-4 text-xl text-white">ADD</button>
                </div>
            </form>
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
