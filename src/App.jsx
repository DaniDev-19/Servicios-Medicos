import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
////////////////////////// PANTALLAS PÚBLICAS //////////////////////////
import Landing from "./pages/landing.jsx";
import Login from "./pages/Login.jsx";
////////////////////////// PANTALLAS PRIVADAS //////////////////////////
import DaskBoard from './pages/DaskBoard.jsx';
import Consultas from './pages/Consultas.jsx';
import Pacientes from './pages/Pacientes.jsx';
import Seguimiento from './pages/SeguimientoPaciente.jsx';

////////////////////////// PANTALLAS FORMULARIOS ////////////////
import ForConsultas from './Formularios/ForConsultas'; 
///////////////////////// COMPONENTES //////////////////////////
import MainLayout from './components/MainLayout.jsx';
import Header from "./components/header.jsx";
////////////////////////// FIN IMPORTACIONES DE COMPONENTES//////////////////////////

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
          <Route 
            path="/" 
            element={
              <Landing />
            } 
          />
          <Route 
            path="/login" 
            element={
              <>
              <Header/>
                <Login />
            
              </>
            } 
          />

          {/* RUTAS PRIVADAS */}
            <Route path='/admin' element={<MainLayout/>}>
              <Route index element={<DaskBoard/>} />
              <Route path='Consultas' element={<Consultas/>} />
              <Route path='ForConsultas' element={<ForConsultas/>} />
              <Route path='Pacientes' element={<Pacientes/>} />
              <Route path='Seguimiento' element={<Seguimiento/>} />

            </Route>

          {/* RUTA PARA ERROR 404 */}
          <Route path="*" element={<h1> Página no encontrada -- Error 404 -- </h1>} />
          
      </Routes>   
    </BrowserRouter>
    </>
  )
}

export default App
