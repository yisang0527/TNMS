import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './component/HeaderComponent/Header';
import Prev from './page/Prev';

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* 이곳에 link 주소를 라우트, path와 element로 넣으면 됩니다. */}

        <Route path='/prev' element={<Prev />} />
      </Routes>
    </>
  )
}

export default App
