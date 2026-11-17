import { type FormEvent, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProduct } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import PendingModal from "../common/pendingModal";
import ResultModal from "../common/resultModal";

const inputClass = "w-4/5 rounded border border-neutral-300 p-4 shadow-sm";

function AddComponent() {
    const { moveToList } = useCustomMove();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (formData: FormData) => postProduct(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products/list"], exact: false });
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(new FormData(e.currentTarget));
    };

    return (
        <div className="m-2 mt-10 border-2 border-sky-200 p-4">
            {mutation.isPending && <PendingModal />}
            {mutation.data?.RESULT && (
                <ResultModal
                    title="상품 추가 결과"
                    content={`새로운 ${mutation.data.RESULT}번 상품 추가됨`}
                    callbackFn={() => moveToList()}
                />
            )}
            {mutation.isError && <div className="text-red-600">등록 실패</div>}

            <form onSubmit={handleSubmit}>
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