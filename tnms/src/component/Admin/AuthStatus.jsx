// src/Admin/AuthStatus.jsx

import { Link } from "react-router-dom";
import { useAuth } from "./Authcontext";

export default function AuthStatus() {
    const { user, signout } = useAuth();

    async function logout() {
        // 로그아웃 하겠냐 물어볼꺼면
        // if(!window.confirm("로그아웃 하시겠습니까")) return
        await signout();
    }

    return (
        <header>
            {
                user ? ( // 로그인상태일때 보여줄내용
                    <div>
                        <span>{user}님</span>
                        <button onClick={logout}>로그아웃</button>
                    </div>
                ) : ( // 로그인 안했을때 보여줄 내용
                    <div>
                        <Link to="/signIn">로그인</Link>
                    </div>
                )
            }
        </header>
    )
}