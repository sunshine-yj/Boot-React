import { imageUrl } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomCart from "../../hooks/useCustomCart";

function ReadComponent({ product }: { product: ProductDTO }) {
    const { moveToModify, moveToList } = useCustomMove();
    const { changeCart, cartItems } = useCustomCart();

    const handleClickAddCart = () => {
        const added = cartItems.items.find((item) => item.pno === product.pno);

        if (added) {
            if (!window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?")) return;
            changeCart(added.cino, product.pno, 1);
        } else {
            changeCart(null, product.pno, 1);
        }
    };

    return (
        <div className="m-2 mt-10 border-2 border-sky-200 bg-white p-4">
            <Row label="PNO" value={product.pno} />
            <Row label="PNAME" value={product.pname} />
            <Row label="PRICE" value={product.price} />
            <Row label="PDESC" value={product.pdesc} />

            <div className="flex w-full flex-col items-center">
                {product.uploadFileNames.map((fileName) => (
                    <img key={fileName} alt="product" className="w-1/2 p-4" src={imageUrl(fileName)} />
                ))}
            </div>

            <div className="flex justify-end gap-2 p-4">
                <button type="button" className="w-32 rounded bg-green-500 p-3 text-xl text-white" onClick={handleClickAddCart}>
                    Add Cart
                </button>
                <button type="button" className="w-32 rounded bg-red-500 p-3 text-xl text-white" onClick={() => moveToModify(product.pno)}>
                    Modify
                </button>
                <button type="button" className="w-32 rounded bg-blue-500 p-3 text-xl text-white" onClick={() => moveToList()}>
                    List
                </button>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="mb-3 flex w-full">
            <div className="w-1/5 p-4 text-right font-bold">{label}</div>
            <div className="w-4/5 rounded border p-4 shadow-sm">{value}</div>
        </div>
    );
}

export default ReadComponent;