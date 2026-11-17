import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const rest_api_key = import.meta.env.VITE_KAKAO_REST_KEY;
const client_secret = import.meta.env.VITE_KAKAO_CLIENT_SECRET;

const redirect_uri = "http://localhost:5173/member/kakao";
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
const access_token_url = "https://kauth.kakao.com/oauth/token";

export const getKakaoLoginLink = () =>
    `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

export const getAccessToken = async (authCode: string): Promise<string> => {
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri,
        code: authCode,
        client_secret,
    };
    const res = await axios.post(access_token_url, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.data.access_token;
};

export const getMemberWithAccessToken = async (accessToken: string) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao`, { params: { accessToken } });
    return res.data;
};