import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/cartItemComponent";

function CartComponent() {
    const { loginState, isLogin, cartItems, changeCart } = useCustomCart();

    if (!isLogin) return null;

    const total = cartItems.items.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="w-full">
            <div className="flex items-center gap-2">
                <div className="font-bold">{loginState.email} 님 Cart</div>
                <div className="min-w-8 rounded-full bg-orange-600 px-2 text-center font-bold text-white">
                    {cartItems.items.length}
                </div>
            </div>

            {cartItems.status === "pending" && <div>Loading....</div>}

            <ul className="mt-2 grid gap-2">
                {cartItems.items.map((item) => (
                    <CartItemComponent key={item.cino} cartItem={item} changeCart={changeCart} />
                ))}
            </ul>

            <div className="mt-3 text-right text-xl font-extrabold">합계 {total.toLocaleString()} 원</div>
        </div>
    );
}

export default CartComponent;