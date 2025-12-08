import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './component/ETC/Header/Header';
import Stats from "./page/Menu1/Stats/Stats";
import Prev from './page/Menu2/Prev/Prev';
import Help from './page/Menu3/Help';
import Qna from './page/Menu4/Qna/Qna';
import Notice from './page/Menu4/Notice/Notice';
import Footer from './component/ETC/Footer/Footer';

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* 이곳에 link 주소를 라우트, path와 element로 넣으면 됩니다. */}

        <Route path='/stats' element={<Stats />} />
        <Route path='/prev' element={<Prev />} />
        <Route path="/help" element={<Help />}/>
        <Route path='/qna' element={<Qna />} />
        <Route path='/notice' element={<Notice />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
