import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import CountryDetail from './components/CountryDetail';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
    </Router>
  )
}

export default App
