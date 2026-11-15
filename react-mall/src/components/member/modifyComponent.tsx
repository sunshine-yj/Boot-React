import { useActionState, type ReactNode } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import jwtAxios from "../../util/jwtUtil";
import { API_SERVER_HOST } from "../../api/todoApi";
import PendingModal from "../common/pendingModal";
import ResultModal from "../common/resultModal";

interface ModifyResult {
    result: string;
    error: string;
}

const initState: ModifyResult = { result: "", error: "" };

const modifyAction = async (_state: ModifyResult, formData: FormData): Promise<ModifyResult> => {
    const email = formData.get("email") as string;
    const pw = formData.get("pw") as string;
    const nickname = formData.get("nickname") as string;

    if (pw.length < 8) return { result: "", error: "패스워드는 8자 이상이어야 합니다." };

    try {
        await jwtAxios.put(`${API_SERVER_HOST}/api/member/modify`, { email, pw, nickname });
    } catch (err) {
        console.error(err);
        return { result: "", error: "수정 중 오류가 발생했습니다." };
    }
    return { result: "Modified", error: "" };
};

const inputClass = "w-4/5 rounded border border-neutral-300 p-4 shadow-sm";

function ModifyComponent() {
    const { loginState, doLogout, moveToLogin } = useCustomLogin();
    const [state, action, isPending] = useActionState(modifyAction, initState);

    const closeModal = () => {
        doLogout();
        moveToLogin();
    };

    return (
        <div className="mt-6">
            {isPending && <PendingModal />}
            {state.error && <div className="bg-amber-400 p-2">{state.error}</div>}
            {state.result && <ResultModal title="회원정보 수정 결과" content="회원정보가 수정되었습니다." callbackFn={closeModal} />}

            <form action={action}>
                <Field label="Email"><input className={`${inputClass} bg-gray-100`} name="email" defaultValue={loginState.email} readOnly /></Field>
                <Field label="Password"><input className={inputClass} name="pw" type="password" /></Field>
                <Field label="Nickname"><input className={inputClass} name="nickname" defaultValue={loginState.nickname} /></Field>
                <div className="flex justify-end">
                    <button type="submit" className="m-2 w-32 rounded bg-blue-500 p-4 text-xl text-white">Modify</button>
                </div>
            </form>
        </div>
    );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="mb-4 flex w-full items-center">
            <div className="w-1/5 p-4 text-right font-bold">{label}</div>
            {children}
        </div>
    );
}

export default ModifyComponent;