import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import StatsChart from './component/stats'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/stats' element={<StatsChart />} />
        </Routes>
      </Router>
    </>
  )
}

export default App