import axios from 'axios';
import { BaseUrl } from './Constans';
import { notifyGlobal } from './globalNotification';

let sessionExpired = false;

const API_URL = BaseUrl;

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    async error => {
        if (
            error.response && error.response.status === 401 && !sessionExpired
        ) {
            sessionExpired = true;
            notifyGlobal('Tu sesión ha expirado. Serás redirigido al login.', 'warning');

            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await axios.post(`${API_URL}auth/logout`, {}, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                } catch (err) {
                    console.error('Error cerrando sesión en backend:', err);
                }
            }

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('permisos');

            setTimeout(() => {
                window.location.href = '/Login';
            }, 5000);
        }
        return Promise.reject(error);
    }
);

export default api;