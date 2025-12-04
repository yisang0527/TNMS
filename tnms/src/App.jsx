import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stats from "./page/stats";

<<<<<<< Updated upstream
export default function App() {
=======
import Header from './components/HeaderComponents/Header';
import Prev from './page/Prev';
import Stats from './page/Stats/Stats';

function App() {
>>>>>>> Stashed changes
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/stats" element={<Stats />} />
=======
        {/* 이곳에 link 주소를 라우트, path와 element로 넣으면 됩니다. */}

        <Route path='/prev' element={<Prev />} />
        <Route path='/stats' element={<Stats />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}
