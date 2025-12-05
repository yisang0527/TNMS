import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stats from "./page/Stats/Stats";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </>
  );
}