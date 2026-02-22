// Usar variable de entorno para la URL del API
// En producción: http://192.168.1.170/api/
// En desarrollo: http://localhost:4000/
// En producciòn nube: https://medicos-backend.onrender.com/api/
const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/';
export const BaseUrl = rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;