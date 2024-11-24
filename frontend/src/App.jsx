import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CarreraForm from './Components/CarreraForm/CarreraForm'
import CarreraList from './Components/CarreraList/CarreraList'
import Home from './Components/Home/Home'
import LoginForm from './Components/Login/LoginForm'
import RolesForm from './Components/RolesForm/RolesForm'
import RolesList from './Components/RolesList/RolesList'
import CursoForm from './Components/CursoForm/CursoForm'
import CursosList from './Components/CursoList/CursoList'
import RegisterForm from './Components/RegisterForm/RegisterForm'
import RegisterList from './Components/RegisterList/RegisterList'
import StudentForm from './Components/StudentForm/StudentForm'
import StudentList from './Components/StudentList/StudentList'
import MatriculaForm from './Components/MatriculaForm/MatricualForm'
import NotasForm from './Components/NotasForm/NotasForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/carrera" element={<CarreraForm />} />
          <Route path="/carrera_list" element={<CarreraList />} />
          <Route path="/curso" element={<CursoForm />} />
          <Route path="/curso_list" element={<CursosList />} />
          <Route path="/roles" element={<RolesForm />} />
          <Route path="/roles_list" element={<RolesList />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/register_list" element={<RegisterList />} />
          <Route path="/student" element={<StudentForm />} />
          <Route path="/student_list" element={<StudentList />} />
          <Route path="/matricula" element={<MatriculaForm />} />
          <Route path="/notas" element={<NotasForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
