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

function App() {
  const [count, setCount] = useState(0)

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
    </>
  )
}

export default App
