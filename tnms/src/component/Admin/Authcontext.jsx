

//  로그인 여부는 리액트프로젝트 전체에서 필요하기에 state가 아닌

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// 인증에 필요한객체 생성
const AuthContext = createContext(null)

//  어디서든 가져다 쓰도록 내보내기
export function useAuth() {
    return useContext(AuthContext);
}

//  로그인, 회원가입을 위한 컴포넌트
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null) //로그인한 사용자넣기
    const [loading, setLoading] = useState(true); //  인증상태 확인을위한

    useEffect(
        () => {
            const unsub = onAuthStateChanged(auth, (firebaseUser) => {
                setUser(firebaseUser); // 로그인하면 user객체, 로그아웃하면 null
                setLoading(false);
            })
            return () => unsub();
        }, []
    );

    // 회원가입
    async function signup(email, password) {
        const u = await createUserWithEmailAndPassword(auth, email, password);
        return u.user;
    }

    // 로그인
    async function signin(email, password) {
        const u = await signInWithEmailAndPassword(auth, email, password);
        return u.user;
    }

    // 로그아웃
    async function signout() {
        await signOut(auth);
    }

    const value = { user, loading, signup, signin, signout };

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