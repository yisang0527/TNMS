import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './component/HeaderComponent/Header';
import Stats from "./page/Stats";
import Prev from './page/Prev';
import Qna from './page/Qna';
import Notice from './page/Notice';
import Footer from './component/FooterComponent/Footer'

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* 이곳에 link 주소를 라우트, path와 element로 넣으면 됩니다. */}

        <Route path='/stats' element={<Stats />} />
        <Route path='/prev' element={<Prev />} />
        <Route path='/qna' element={<Qna />} />
        <Route path='/notice' element={<Notice />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
