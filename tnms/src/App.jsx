import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LegendProvider } from "./component/Admin/LegendContext";
import { AuthProvider } from "./component/Admin/Authcontext";
import ProtectedRoute from "./component/Admin/ProtectedRoute";
import Stats from "./page/Stats";
import AdminLogin from "./page/AdminLogin";
import AdminPage from "./page/AdminPage";
import Notice from "./page/Notice";
import Qna from "./page/Qna";

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