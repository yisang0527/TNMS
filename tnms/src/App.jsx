import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'
import React from "react";
import {Routes,Route} from "react-router-dom";
import Main from "./page/Main"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>

      <Routes>
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </>
  )
}

export default App
