import {useState} from 'react';
import '../index.css';
import icon from '../components/icon';

function Login () {
    const[showPassword, setShowPassword] = useState(false);
    return (

        <div className="loginContainer">
            <div className="cartForm">
                    <h1 className="title"> 
                        Cuidarte Yutong
                        <img src={icon.pulso2} alt="corazon" title='Servicios Medicos Yutong' className='icon'/>
                    </h1>
                <form className="formLogin">
                    <div className='infoLabels'>
                        <label htmlFor="userInput"  title='Campo de Usuario'> <img src={icon.user} alt="usuario" className='icon'/>Usuario o Correo</label>
                    </div>
                    <div className="infoGroup">
                        <input type="text" id="userInput" title='Usuario O Correo' placeholder="Rellene el campo" className= "input"/>
                    </div>
                    <div className='infoLabels'>
                        <label htmlFor="passInput" className='labels' title='Campo de Contraseña'> <img src={icon.llave} alt="contraseña" className='icon'/>Contraseña</label>
                    </div>
                    <div className="infoGroup">
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            id="passInput" 
                            placeholder="********" 
                            className= "input" 
                            title='Contraseña'
                        />
                        <img 
                        src={showPassword ? icon.ojitoculto : icon.ojito}
                        onClick={() => setShowPassword(!showPassword)}
                        alt="ojito" 
                        className='icon' />
                    </div>
                    <button 
                    type="submit"
                    className="btn-estandar" 
                    title="Entrar" 
                    alt="Boton Login" 
                    >
                        Iniciar Sesión
                    </button>
                    <button
                    type="button"
                    className="btn-link"
                    title="Recuperar Contraseña"
                    >
                        <img src={icon.link} alt="Link" className='icon'/>
                        ¿Has Olvidado Tu Contraseña?
                    </button>
                </form>
                    
                
                <footer className="footerCart">
                    {/* <p>Gobierno Bolivariano de Venezuela &#x1F1FB;&#x1F1EA;</p> */}
                    <p>© 2025 Planta de Autobuses Yutong Venezuela &#x1F1FB;&#x1F1EA;</p>
                    <p>Sistema de Información para la Gestion de Servicios Médicos Yutong</p>
                </footer>
            </div>
            
                        {/* <div>
                            🧾 Nombre de la Aplicación
            Cuidarte Yutong Sistema de Información para la Gestión de Consultas y Servicios Médicos en la Planta Yutong Venezuela
            
            🧠 Descripción General del Proyecto
            Cuidarte Yutong es una plataforma digital diseñada para optimizar la atención médica de los trabajadores de la planta de autobuses Yutong en Venezuela. El sistema permite gestionar consultas médicas, historiales clínicos, servicios de enfermería, seguimiento de tratamientos y control de incapacidades, todo en un entorno seguro y eficiente.
                        </div> */}
        </div>
    );
}

export default Login;