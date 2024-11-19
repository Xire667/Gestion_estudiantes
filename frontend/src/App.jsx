import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CarreraForm from './Components/CarreraForm/CarreraForm'
import CarreraList from './Components/CarreraList/CarreraList'
import Home from './Components/Home/Home'
import LoginForm from './Components/Login/LoginForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/carrera" element={<CarreraForm />} />
          <Route path="/carrera_list" element={<CarreraList />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
