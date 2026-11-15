import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);
    return cookies.set(name, value, { path: "/", expires });
};

export const getCookie = (name: string) => cookies.get(name);

export const removeCookie = (name: string, path = "/") => {
    cookies.remove(name, { path });
};