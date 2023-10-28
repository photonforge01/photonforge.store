import { useState } from 'react'

import './App.css'
import Header from './component/Header/Header'
import { BrowserRouter as Router,
  Routes,
  Route,
  useLocation, } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Shop from './pages/Shop/Shop'
import Login from './pages/SignInUp/Login'
import Signin from './pages/SignInUp/Signin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-screen h-auto flex flex-col  bg-white">
      <Router>
        {/* <Cursor scaling={scaling}/> */}
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>

      </div>
    </>
  )
}

export default App
