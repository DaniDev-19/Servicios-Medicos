import axios from 'axios';
import { BaseUrl }  from './Constans';


/**
* Registrar inicio de sesión en la bitacora.
*  @param {number} userId - ID del usuario.
*  @param {string} username - Nombre del usuario.
*/

export const registrarInicioSesion = (userId, username) => {
    axios.post(`${BaseUrl}/inicio-sesion`, {usuario: username, usuario_id: userId })
    .then(()=> {
        console.log(`Inicio de sesiòn registrado para el usuario con ID: ${userId}`);
    })
    .catch((error) => {
        console.error('Error al registrar inicio de sesión:', error);
    });
};

/**
 * Registrar cierre de sesión en la bitácora.
 *  @param {number} userId - ID del usuario.
 *  @param {string} username - Nombre del usuario.
 */

export const RegistrarCierreSesion = (userId, username) => {
    axios.post(`${BaseUrl}/cierre-sesion`, {usuario: username, usuario_id: userId})
    .then(() => {
        console.log(`Cierre de Sesión registrado para el usuario con el ID: ${userId}`);
    })
    .catch((error) => {
        console.error('Error al registrar cierre de sesión', error);
    });
};