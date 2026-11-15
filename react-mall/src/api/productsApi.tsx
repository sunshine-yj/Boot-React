import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

export const PRODUCT_HOST = `${API_SERVER_HOST}/api/products`;

export const imageUrl = (fileName: string, thumb = false) =>
    `${PRODUCT_HOST}/view/${thumb ? "s_" : ""}${fileName}`;

export const getProductList = async (pageParam: PageParam): Promise<PageResponseDTO<ProductDTO>> => {
    const res = await axios.get(`${PRODUCT_HOST}/list`, { params: pageParam });
    return res.data;
};

export const getProduct = async (pno: number | string): Promise<ProductDTO> => {
    const res = await axios.get(`${PRODUCT_HOST}/${pno}`);
    return res.data;
};

export const postProduct = async (formData: FormData): Promise<{ RESULT: number }> => {
    const res = await axios.post(`${PRODUCT_HOST}/`, formData);
    return res.data;
};

export const putProduct = async (pno: number | string, formData: FormData) => {
    const res = await axios.put(`${PRODUCT_HOST}/${pno}`, formData);
    return res.data;
};

export const deleteProduct = async (pno: number | string) => {
    const res = await axios.delete(`${PRODUCT_HOST}/${pno}`);
    return res.data;
};