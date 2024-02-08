import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Header from './components/Header'
import Dashboard from './pages/Admin/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/admin' element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
