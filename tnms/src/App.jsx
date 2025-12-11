import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { LegendProvider } from "./component/Admin/LegendContext";
import { AuthProvider } from "./component/Admin/Authcontext";
import ProtectedRoute from "./component/Admin/ProtectedRoute";

import "./App.css"

import Header from './component/Layout/Header/Header';
import Footer from './component/Layout/Footer/Footer';

import Index from './page/Main/Index';
import Issues from './page/Issues/Issues';
import Stats from './page/Stats/Stats/Stats';
import Prev from './page/Prevs/Prev/Prev';
import Number from './page/Prevs/Number/Number';
import Help from './page/Helps/Help/Help';
import Qna from './page/Q&a/Qna';
import Notice from './page/Q&a/Notice';

import AdminLogin from "./page/Admin/AdminLogin";
import AdminPage from "./page/Admin/AdminPage";
import MainPopup from "./component/Popup/MainPopup";


// 일반 레이아웃
const UserLayout = () => {
  const location = useLocation();
  const isMain = location.pathname === "/";  // 메인 페이지 여부 체크

  return (
    <>
      <MainPopup />
      <Header />
      <Outlet />
      {!isMain && <Footer />}  {/* 메인 페이지가 아닐 때만 Footer 출력 */}
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LegendProvider>  {/* ★ Stats에 필요함 */}
        <Router>
          <Routes>

            {/* 일반 레이아웃 */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/prev" element={<Prev />} />
              <Route path="/number" element={<Number />} />
              <Route path="/help" element={<Help />} />
              <Route path="/qna" element={<Qna />} />
              <Route path="/notice" element={<Notice />} />
            </Route>

            {/* 관리자 (레이아웃 X) */}
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

          </Routes>
        </Router>
      </LegendProvider>
    </AuthProvider>
  );
}