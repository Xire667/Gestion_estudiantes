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
import StudentForm from './Components/StudentForm/StudentForm'
import StudentList from './Components/StudentList/StudentList'
import MatriculaForm from './Components/MatriculaForm/MatricualForm'
import NotasForm from './Components/NotasForm/NotasForm'
import TeacherForm from './Components/TeacherForm/TeacherForm'
import TeachersList from './Components/TeacherList/TeacherList'
import MatriculasList from './Components/MatriculaList/MatriculaList'
import NotasList from './Components/NotasList/NotasList'
import MenuPrincipal from './Components/MenuPrincipalForm/MenuPrincipalForm'
import Menu_Administrador from './Components/Menu_Administrador/Menu_Administrador'
import Menu_Student from './Components/MenuStudent/MenuStudent'
import CursosListStu from './Components/CursoListStu/CursoListStu'
import NotasListStu from './Components/NotasListStu/NotasListStu'
import TeachersListStu from './Components/TeacherListStu/TeacherListStu'
import Menu_Teacher from './Components/MenuTeacher/Menu_Teacher'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPrincipal />} />
          <Route path="/menu_admi" element={<Menu_Administrador />} />
          <Route path="/menu_stu" element={<Menu_Student />} />
          <Route path="/curso_list_stu" element={<CursosListStu />} />
          <Route path="/notas_list_stu" element={<NotasListStu />} />
          <Route path="/teacher_list_stu" element={<TeachersListStu />} />
          <Route path="/menu_profe" element={<Menu_Teacher />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/carrera" element={<CarreraForm />} />
          <Route path="/carrera_list" element={<CarreraList />} />
          <Route path="/curso" element={<CursoForm />} />
          <Route path="/curso_list" element={<CursosList />} />
          <Route path="/roles" element={<RolesForm />} />
          <Route path="/roles_list" element={<RolesList />} />
          <Route path="/student" element={<StudentForm />} />
          <Route path="/student_list" element={<StudentList />} />
          <Route path="/matricula" element={<MatriculaForm />} />
          <Route path="/matricula_list" element={<MatriculasList />} />
          <Route path="/notas" element={<NotasForm />} />
          <Route path="/notas_list" element={<NotasList/>} />
          <Route path="/teacher" element={<TeacherForm />} />
          <Route path="/teacher_list" element={<TeachersList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
