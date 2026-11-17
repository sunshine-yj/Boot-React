import { imageUrl } from "../../api/productsApi";

interface CartItemComponentProps {
    cartItem: CartItemResponse;
    changeCart: (cino: number, pno: number, amount: number) => void;
}

const btn = "h-8 w-8 rounded-lg text-xl font-bold";

function CartItemComponent({ cartItem, changeCart }: CartItemComponentProps) {
    const { cino, pno, pname, price, qty, imageFile } = cartItem;

    return (
        <li className="rounded border-2 bg-white p-2">
            <img alt={pname} className="w-full" src={imageUrl(imageFile, true)} />

            <div className="mt-2 text-sm">
                <div>Cart Item No: {cino} · Pno: {pno}</div>
                <div className="text-base font-bold">{pname}</div>
                <div>Price: {price.toLocaleString()}</div>
            </div>

            <div className="mt-2 flex items-center gap-1">
                <span className="mr-auto">Qty: {qty}</span>
                <button type="button" className={`${btn} bg-orange-400`} onClick={() => changeCart(cino, pno, 1)}>+</button>
                <button type="button" className={`${btn} bg-orange-400`} onClick={() => changeCart(cino, pno, -1)}>−</button>
                <button type="button" className={`${btn} bg-red-500 text-white`} onClick={() => changeCart(cino, pno, -qty)}>X</button>
            </div>

            <div className="mt-2 border-t-2 pt-1 text-right font-extrabold">{(qty * price).toLocaleString()}원</div>
        </li>
    );
}

export default CartItemComponent;