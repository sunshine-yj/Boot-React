import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice";
import useCustomLogin from "./useCustomLogin";

function useCustomCart() {
    const { loginState, isLogin } = useCustomLogin();
    const cartItems = useSelector((state: RootState) => state.cartSlice);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isLogin) dispatch(getCartItemsAsync());
    }, [isLogin, dispatch]);

    const changeCart = (cino: number | null, pno: number, amount: number) => {
        const email = loginState.email;
        let qty = 1;

        if (cino) {
            const target = cartItems.items.find((item) => item.cino === cino);
            if (target) qty = target.qty + amount;
        }
        const requestItem: CartItemRequest = cino ? { email, cino, pno, qty } : { email, pno, qty };
        dispatch(postChangeCartAsync(requestItem));
    };
    return { loginState, isLogin, cartItems, changeCart };
}

export default useCustomCart;