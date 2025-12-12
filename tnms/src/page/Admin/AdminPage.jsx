
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../component/Admin/Authcontext";
import AdminGraph from "../../component/Admin/AdminGraph";
import AdminNotice from "../../component/Admin/AdminNotice";
import AdminQna from "../../component/Admin/AdminQna";
import AdminPopup from "../../component/Admin/AdminPopup";
import AdminMain from "../../component/Admin/AdminMain"

export default function AdminPage() {
    const { signout } = useAuth();
    const nav = useNavigate();
    const [activeMenu, setActiveMenu] = useState("범례설정");

    const menuItems = [
        { id: "main", label: "메인 메뉴" },
        { id: "admingraph", label: "그래프 관리" },
        { id: "adminqna", label: "Q&A 관리" },
        { id: "adminnotice1", label: "공지사항 관리" },
        { id: "adminpopup", label: "팝업창 관리" },
        { id: "adminmain", label: "메인페이지 관리" },
        { id: "adminissues", label: "재난이슈 관리" },
    ];

    // 로그아웃 함수 수정
    async function handleLogout() {
        await signout();
        nav("/"); // 메인페이지로 이동
    }

    // 현재 선택된 메뉴에 따라 컴포넌트 렌더링
    const renderContent = () => {
        switch (activeMenu) {
            case "그래프 관리":
                return <AdminGraph />;
            case "Q&A 관리":
                return <AdminQna />;
            case "공지사항 관리":
                return <AdminNotice />;
            case "팝업창 관리":
                return <AdminPopup />;
            case "메인페이지 관리":
                return <AdminMain />;
            case "재난이슈 관리": return <div>재난이슈 컴포넌트 미구현</div>;
                /* return <AdminIssues />; */
            default:
                return <div>메뉴를 선택하세요</div>;
        }
    };

    return (
        <div className="min-h-screen">
            {/* 헤더 */}
            <div className="h-[100px] bg-white flex justify-between items-center border-b px-8">
                <h1 className="text-3xl font-bold mx-auto">관리자 페이지</h1>
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    로그아웃
                </button>
            </div>

            <div className="flex">
                {/* 왼쪽 사이드바 */}
                <div className="w-[240px] bg-purple-100 min-h-[calc(100vh-100px)] p-6">
                    {/* 메인 메뉴 제목 */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold px-2">메인 메뉴</h2>
                    </div>

                    <nav className="space-y-3">
                        {menuItems.slice(1).map((item) => {
                            const isActive = activeMenu === item.label;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveMenu(item.label)}
                                    className={`w-full px-5 py-3 rounded-lg text-left transition-all ${isActive
                                        ? "bg-white shadow-md font-semibold"
                                        : "bg-transparent hover:bg-white/50"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* 오른쪽 메인 컨텐츠 영역 */}
                <div className="flex-1 p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}