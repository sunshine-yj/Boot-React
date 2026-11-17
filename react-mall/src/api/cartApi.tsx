import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async (): Promise<CartItemResponse[]> => {
    const res = await jwtAxios.get(`${host}/items`);
    return res.data;
};

export const postChangeCart = async (cartItem: CartItemRequest): Promise<CartItemResponse[]> => {
    const res = await jwtAxios.post(`${host}/change`, cartItem);
    return res.data;
};