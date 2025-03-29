// composables/axios.js
import axios from 'axios';

// Función para obtener el token más reciente desde el localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Configuración base de Axios
axios.defaults.baseURL = 'http://localhost:3000';  // Dirección base de la API

// Interceptor para agregar el token a las solicitudes
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores globalmente
axios.interceptors.response.use(
  (response) => response,  // Pasar las respuestas exitosas sin cambios
  (error) => {
    if (error.response.status === 401) {
      console.error('Sesión expirada o token no válido');
      // Aquí podrías redirigir al usuario al login o ejecutar una acción
    }
    return Promise.reject(error);
  }
);

export default axios;
