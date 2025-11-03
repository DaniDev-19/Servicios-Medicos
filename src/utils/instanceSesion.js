import axios from 'axios';
import {BaseUrl} from './utils/Constans';
import { notifyGlobal } from './globalNotification';

let sessionExpired = false;

const API_URL = import.meta.env.VITE_API_URL || BaseUrl;

axios.interceptor.response.use(
    response => response,
    async error => {
        if (
            error.response && error.response.status === 401 && !sessionExpired
        ) {
            sessionExpired = true;
            notifyGlobal('Tu sesión ha expirdo. Serás redirigido al login.', 'warning');

            const token = localStorage.getItem('token');
            if(token){
                try{
                    await axios.post(`${API_URL}/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                console.error('Error cerrando sesión en backend:', error);
            }
            localStorage.removeItem('token');

        }else {
            localStorage.removeItem('token');
        }
        localStorage.removeItem('user');
        localStorage.removeItem('permisos');
            setTimeout(() => {
                window.location.href = '/Login';
            }, 5000);
        }
        return Promise.reject(error);
    }
)