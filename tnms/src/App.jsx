import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"

import Footer from './component/Footer'

// import Guide from "./page/Guide";
// import Privacy from "./page/Privacy";
// import Copyright from "./page/Copyright.jsx";
// import Info from "./page/Info";
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './component/HeaderComponent/Header';
import Prev from './page/Prev';

function App() {
  return (
    <>

      {/* <Header /> */}

      <Routes>
        {/* <Route path="/guide" element={<Guide />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/copyright" element={<Copyright />} />
        <Route path="/info" element={<Info />} /> */}

        {/* 기본 메인 페이지 */}
        <Route path="/" element={<Guide />} />
      </Routes>

      <Footer />
      <Header />

      <Routes>
        {/* 이곳에 link 주소를 라우트, path와 element로 넣으면 됩니다. */}

        <Route path='/prev' element={<Prev />} />
      </Routes>
    </>
  )
}

export default App
