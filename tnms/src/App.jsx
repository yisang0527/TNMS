import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Prev from './page/Prev'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Prev />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
