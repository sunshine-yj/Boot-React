import { useState, type FormEvent, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, imageUrl, putProduct } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import PendingModal from "../common/pendingModal";
import ResultModal from "../common/resultModal";

const inputClass = "w-4/5 rounded border border-neutral-300 p-4 shadow-sm";

function ModifyComponent({ product }: { product: ProductDTO }) {
    const { moveToRead, moveToList } = useCustomMove();
    const [images, setImages] = useState<string[]>([...product.uploadFileNames]);
    const queryClient = useQueryClient();

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ["product", String(product.pno)] });
        queryClient.invalidateQueries({ queryKey: ["products/list"], exact: false });
    };

    const modifyMutation = useMutation({
        mutationFn: (formData: FormData) => putProduct(product.pno, formData),
        onSuccess: invalidate,
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteProduct(product.pno),
        onSuccess: invalidate,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        if (submitter.value === "delete") deleteMutation.mutate();
        else modifyMutation.mutate(new FormData(e.currentTarget));
    };

    const done = modifyMutation.isSuccess || deleteMutation.isSuccess;
    const closeModal = () => (deleteMutation.isSuccess ? moveToList() : moveToRead(product.pno));

    return (
        <div className="m-2 mt-10 border-2 border-sky-200 bg-white p-4">
            {(modifyMutation.isPending || deleteMutation.isPending) && <PendingModal />}
            {done && <ResultModal title="처리 완료" content="처리 완료" callbackFn={closeModal} />}

            <form onSubmit={handleSubmit}>
                <Field label="PNO"><input className={`${inputClass} bg-gray-100`} name="pno" readOnly defaultValue={product.pno} /></Field>
                <Field label="PNAME"><input className={inputClass} name="pname" required defaultValue={product.pname} /></Field>
                <Field label="PRICE"><input className={inputClass} name="price" type="number" defaultValue={product.price} /></Field>
                <Field label="PDESC">
                    <textarea className={`${inputClass} resize-y`} name="pdesc" rows={4} required defaultValue={product.pdesc} />
                </Field>
                <Field label="Files"><input className={inputClass} name="files" type="file" multiple accept="image/*" /></Field>

                <div className="m-auto flex w-full flex-wrap justify-center gap-4">
                    {images.map((file) => (
                        <div key={file} className="flex w-1/3 flex-col">
                            <button type="button" className="bg-blue-500 text-xl text-white"
                                    onClick={() => setImages((prev) => prev.filter((img) => img !== file))}>
                                DELETE
                            </button>
                            <img alt="img" src={imageUrl(file, true)} />
                            <input type="hidden" name="uploadFileNames" value={file} />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2 p-4">
                    <button type="submit" value="delete" className="w-32 rounded bg-red-500 p-3 text-xl text-white">Delete</button>
                    <button type="submit" value="modify" className="w-32 rounded bg-orange-500 p-3 text-xl text-white">Modify</button>
                    <button type="button" className="w-32 rounded bg-blue-500 p-3 text-xl text-white" onClick={() => moveToList()}>List</button>
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

export default ModifyComponent;