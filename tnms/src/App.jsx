import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { LegendProvider } from "./component/Admin/LegendContext";
import { AuthProvider } from "./component/Admin/Authcontext";
import ProtectedRoute from "./component/Admin/ProtectedRoute";

import Header from './component/ETC/Header/Header';
import Footer from './component/ETC/Footer/Footer';

import Index from './page/Main/Index';
import Stats from './page/Menu1/Stats/Stats';
import Prev from './page/Menu2/Prev/Prev';
import Number from './page/Menu2/Number/Number';
import Help from './page/Menu3/Help/Help';
import Qna from './page/Menu4/Qna';
import Notice from './page/Menu4/Notice';

import AdminLogin from "./page/Admin/AdminLogin";
import AdminPage from "./page/Admin/AdminPage";


// 일반 레이아웃
const UserLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default function App() {
  return (
    <AuthProvider>
      <LegendProvider>  {/* ★ Stats에 필요함 */}
        <Router>
          <Routes>

            {/* 일반 레이아웃 */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/stats" element={<Stats />} />  {/* 정상 작동 */}
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
