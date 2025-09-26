import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
////////////////////////// IMPORTACIONES DE PANTALLAS//////////////////////////
import Login from './pages/Login';
////////////////////////// FIN IMPORTACIONES DE PANTALLAS//////////////////////////

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
          {/* RUTAS PUBLICAS */}
          <Route path='/' element = { <Login/>} /> 
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
