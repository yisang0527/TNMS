// src/Admin/Authcontext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

// 인증에 필요한 객체 생성
const AuthContext = createContext(null)

// 어디서든 가져다 쓰도록 내보내기
export function useAuth() {
    return useContext(AuthContext);
}

// 로그인을 위한 컴포넌트
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null) // 로그인한 사용자 넣기
    const [loading, setLoading] = useState(true); // 인증상태 확인을 위한

    useEffect(
        () => {
            const unsub = onAuthStateChanged(auth, (firebaseUser) => {
                setUser(firebaseUser); // 로그인하면 user객체, 로그아웃하면 null
                setLoading(false);
            })
            return () => unsub();
        }, []
    );

    // 로그인
    async function signin(email, password) {
        const u = await signInWithEmailAndPassword(auth, email, password);
        return u.user;
    }

    // 로그아웃
    async function signout() {
        await auth.signOut();
    }

    const value = { user, loading, signin, signout }; // signup 제거

    return (
        <AuthContext.Provider value={value}>
            {/* 초기동작에 렌더링을 막아 화면깜빡임을 방지 */}
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    인증상태 확인중...
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}