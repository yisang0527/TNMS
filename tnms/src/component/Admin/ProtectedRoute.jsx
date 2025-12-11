// src/component/Admin/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                로딩중...
            </div>
        );
    }

    if (!user) {
        // 로그인하지 않았으면 로그인 페이지로 리다이렉트
        return <Navigate to="/" replace />;
    }

    // 로그인했으면 children(관리자 페이지) 표시
    return children;
}