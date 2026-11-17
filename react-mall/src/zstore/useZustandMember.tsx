import { create } from "zustand";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

export interface MemberInfo {
    email: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
    roleNames: string[];
    social?: boolean;
}

export interface MemberStore {
    member: MemberInfo;
    status: "" | "pending" | "fulfilled" | "rejected";
    login: (email: string, pw: string) => Promise<void>;
    logout: () => void;
    save: (memberInfo: MemberInfo) => void;
}

const initState: MemberInfo = { email: "", nickname: "", accessToken: "", refreshToken: "", roleNames: [] };

const cookieMember: MemberInfo | undefined = getCookie("member");

const useZustandMember = create<MemberStore>()((set) => ({
    member: cookieMember ?? initState,
    status: cookieMember ? "fulfilled" : "",

    login: async (email, pw) => {
        set({ status: "pending" });
        try {
            const data = await loginPost(email, pw);
            if (data.error) {
                set({ member: { ...initState }, status: "rejected" });
                return;
            }
            set({ member: { ...data }, status: "fulfilled" });
            setCookie("member", JSON.stringify({ ...data, status: "fulfilled" }), 1);
        } catch (e) {
            console.error("login failed", e);
            set({ status: "rejected" });
        }
    },

    logout: () => {
        removeCookie("member");
        set({ member: { ...initState }, status: "" });
    },

    save: (memberInfo) => {
        setCookie("member", JSON.stringify({ ...memberInfo, status: "saved" }), 1);
        set({ member: memberInfo, status: "fulfilled" });
    },
}));

export default useZustandMember;