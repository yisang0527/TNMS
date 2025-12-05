import { useState } from "react"
import { useAuth } from "../../component/Admin/Authcontext"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {
    const { signin } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [loading, setLoading] = useState(false)
    async function onSubmit(e) {
        e.preventDefault();
        if (!email || !pw) {
            alert("이메일과 비밀번호를 입력해주세요");
            return;
        }

        setLoading(true);

        try {
            await signin(email, pw);
            nav("/")
        } catch (err) {
            console.error(err);

        }
    }

    return (
        <>
            <div>관리자페이지</div>
            <div>
                <h1 className="">관리자 로그인</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <label className="">이메일</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="border" />
                    </div>
                    <div>
                        <label className="">비밀번호</label>
                        <input type="password" onChange={(e) => setPw(e.target.value)} className="border" />
                    </div>
                    <button disabled={loading} className="">
                        {loading ? "로그인중..." : "로그인"}
                    </button>
                </form>
            </div>
        </>
    )
}