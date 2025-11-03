import React from 'react';
import {Navigate } from 'react-router-dom';
import {usePermiso} from './usePermiso';

function ProtectedRoute({ pantalla, accion = 'ver', children }) {
    const token = localStorage.getItem('token');
    const tienePermiso = usePermiso();

    if(!token) {
        // si no hay token , redirige al login
        return  <Navigate to='/Login' replace />;
    }

    // si no tiene algun permiso, redirige a acceso no autorizado
    if(!tienePermiso(pantalla,accion)) {
        return <Navigate to='*' replace />
    }

    return children;
};

export default ProtectedRoute;