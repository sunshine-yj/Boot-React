import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getCookie, removeCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken: string, refreshToken: string) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/refresh`, {
        params: { refreshToken },
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
};

const beforeReq = (config: InternalAxiosRequestConfig) => {
    const member = getCookie("member");
    if (!member) {
        return Promise.reject(new Error("REQUIRE_LOGIN"));
    }
    config.headers.Authorization = `Bearer ${member.accessToken}`;
    return config;
};

const requestFail = (err: AxiosError) => Promise.reject(err);

const beforeRes = async (res: AxiosResponse): Promise<AxiosResponse> => {
    if (res.data?.error !== "ERROR_ACCESS_TOKEN") return res;

    const member = getCookie("member");
    const result = await refreshJWT(member.accessToken, member.refreshToken);

    if (result.error) {
        removeCookie("member");
        return Promise.reject(new Error("REQUIRE_LOGIN"));
    }

    member.accessToken = result.accessToken;
    member.refreshToken = result.refreshToken;
    setCookie("member", JSON.stringify(member), 1);

    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
    return axios(originalRequest);
};

const responseFail = (err: AxiosError) => Promise.reject(err);

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;