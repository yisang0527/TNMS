import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Prev from './page/Prev'
import './App.css'
import Header from './component/Header'
import React from "react";
import {Routes,Route} from "react-router-dom";
import Main from "./page/Main"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Prev />} />
        </Routes>
      </Router>
      <Header/>

      <Routes>
        <Route path="/main" element={<Main/>}/>
        {/* 이곳에 link 주소를 라우트, path와 element로 넣으면 됩니다. */}
      </Routes>
    </>
  )
}

export default App
