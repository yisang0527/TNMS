// src/page/Admin/AdminLogin.jsx

import { useState } from "react"
import { useAuth } from "../../component/Admin/Authcontext"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {
    const { signin } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        if (!email || !pw) {
            alert("이메일과 비밀번호를 입력해주세요");
            return;
        }

        setLoading(true);

        try {
            await signin(email, pw);
            nav("/admin")
        } catch (err) {
            console.error(err);
            alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        } finally {
            setLoading(false);
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* 상단 헤더 */}
            <div className="h-[100px] bg-white flex justify-center items-center border">
                <h1 className="text-[32px] font-bold">관리자 페이지</h1>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col items-center pt-[60px] mt-10">
                {/* 관리자 로그인 타이틀 */}
                <h2 className="text-[40px] font-bold mb-[60px]">관리자 로그인</h2>

                <div className="flex items-start gap-6">
                    {/* 왼쪽: 입력 필드 */}
                    <div className="w-[320px] space-y-6">
                        <div>
                            <label className="block text-[14px] text-gray-600 mb-1">아이디</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full h-[45px] px-3 border-2 border-gray-300 rounded bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-[14px] text-gray-600 mb-1">비밀번호</label>
                            <input
                                type="password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full h-[45px] px-3 border-2 border-gray-300 rounded bg-white"
                            />
                        </div>
                    </div>

                    {/* 오른쪽: 로그인 버튼 */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-[150px] h-[150px] text-white text-[28px] mt-4 font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                        style={{ backgroundColor: '#400058' }}
                    >
                        {loading ? "로그인중..." : "로그인"}
                    </button>
                </div>
            </div>
        </div>
    )
}