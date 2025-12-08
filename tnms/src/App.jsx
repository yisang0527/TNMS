import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./component/Admin/Authcontext";
import ProtectedRoute from "./component/Admin/ProtectedRoute";
import Stats from "./page/Stats/Stats";
import AdminLogin from "./page/Admin/AdminLogin";
import AdminPage from "./page/Admin/AdminPage";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/stats" element={<Stats />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            
            {/* 보호된 관리자 페이지 */}
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
      </AuthProvider>
    </>
  );
}