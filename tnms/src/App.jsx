import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LegendProvider } from "./component/Admin/LegendContext";
import { AuthProvider } from "./component/Admin/Authcontext";
import ProtectedRoute from "./component/Admin/ProtectedRoute";
import Stats from "./page/Menu1/Stats/Stats";
import AdminLogin from "./page/Admin/AdminLogin";
import AdminPage from "./page/Admin/AdminPage";
import Notice from "./page/Menu4/Notice";
import Qna from "./page/Menu4/Qna";

export default function App() {
  return (
    <>
      <AuthProvider>
        <LegendProvider>
          <Router>
            <Routes>
              <Route path="/stats" element={<Stats />} />
              <Route path="/adminlogin" element={<AdminLogin />} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/notice" element={<Notice />} />
              <Route path="/qna" element={<Qna />} />
            </Routes>
          </Router>
        </LegendProvider>
      </AuthProvider>
    </>
  );
}