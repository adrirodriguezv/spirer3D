import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userId: localStorage.getItem('userId') || null,  // Inicializa con los valores de localStorage si existen
    token: localStorage.getItem('token') || null,
    userType: localStorage.getItem('userType') || null,
  }),
  
  actions: {
    setUserId(userId) {
      this.userId = userId;
      localStorage.setItem('userId', userId);  // Persistir el userId en localStorage
      console.log('Usuario guardado en el store:', this.userId);  // Verificar el valor del usuario
    },
    
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);  // Persistir el token en localStorage
      console.log('Token guardado en el store:', this.token);  // Verificar el valor del token
    },
    
    setUserType(userType) {
      this.userType = userType;
      localStorage.setItem('userType', userType);  // Persistir el tipo de usuario en localStorage
      console.log('Tipo de usuario guardado en el store:', this.userType);  // Verificar el valor del userType
    },

    logout() {
      this.userId = null;
      this.token = null;
      this.userType = null;

      // Eliminar los valores de localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('userType');

      console.log('Sesión cerrada');
    }
  },
  
  getters: {
    isAuthenticated(state) {
      return state.token !== null;  // Comprobar si el usuario está autenticado
    }
  },
});
