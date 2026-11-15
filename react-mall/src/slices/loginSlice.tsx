import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

export interface LoginInfo {
    email: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
    roleNames: string[];
    social?: boolean;
    status: string;
}

const initState: LoginInfo = {
    email: "",
    nickname: "",
    accessToken: "",
    refreshToken: "",
    roleNames: [],
    status: "",
};

const loadMemberCookie = (): LoginInfo | null => getCookie("member") ?? null;

export const loginPostAsync = createAsyncThunk(
    "loginPostAsync",
    ({ email, pw }: { email: string; pw: string }) => loginPost(email, pw)
);

const loginSlice = createSlice({
    name: "LoginSlice",
    initialState: loadMemberCookie() || initState,
    reducers: {
        save: (_state, action: PayloadAction<LoginInfo>) => {
            const newState = { ...action.payload, status: "saved" };
            setCookie("member", JSON.stringify(newState), 1);
            return newState;
        },

        logout: () => {
            removeCookie("member");
            return { ...initState };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPostAsync.pending, (state) => {
                state.status = "pending";
            })
            .addCase(loginPostAsync.fulfilled, (_state, action) => {
                if (action.payload.error) {
                    return { ...initState, status: "rejected" };
                }
                const newState: LoginInfo = { ...action.payload, status: "fulfilled" };
                setCookie("member", JSON.stringify(newState), 1);
                return newState;
            })
            .addCase(loginPostAsync.rejected, (state) => {
                state.status = "rejected";
            });
    },
});

export const { save, logout } = loginSlice.actions;
export default loginSlice.reducer;