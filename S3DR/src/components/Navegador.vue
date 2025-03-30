<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/">Inicio</router-link>
        </li>
        <li>
          <router-link to="/productos">Productos</router-link>
        </li>
        <li>
          <router-link to="/personalizar">Personalizar</router-link>
        </li>
        <li>
          <router-link to="/contacto">Contacto</router-link>
        </li>
        
        <!-- Solo muestra el enlace de admin si el usuario está autenticado y es admin -->
        <template v-if="isAuthenticated && userType === 'admin'">
          <li>
            <router-link to="/admin">Admin</router-link>
          </li>
        </template>
      </ul>

      <ul class="cliente-container">
        <div class="cliente">
          <!-- Mostrar icono de usuario o enlace a login si no está autenticado -->
          <router-link v-if="!isAuthenticated" to="/login">
            <img src="../assets/img/usuario.png" class="perfil-img" />
          </router-link>

          <!-- Mostrar cesta siempre -->
          <router-link to="/">
            <img src="../assets/img/cesta.png" class="cesta-img" />
          </router-link>

          <!-- Mostrar botón de cerrar sesión si está autenticado -->
          <template v-if="isAuthenticated">
            <button @click="logout">Cerrar sesión</button>
          </template>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';  // Asegúrate de importar el store

const router = useRouter();  // Para redirigir
const authStore = useAuthStore();  // Usa el store de autenticación

// Usar computed en lugar de ref para una reactividad más eficiente
const isAuthenticated = computed(() => authStore.token !== null);
const userType = computed(() => authStore.userType);

// Función de cierre de sesión
const logout = () => {
  // Limpiar el store
  authStore.setToken(null);
  authStore.setUserType(null);
  authStore.setUserId(null);

  // Limpiar localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('userId');

  // Redirigir al login
  router.push('/login');
};
</script>

<style scoped>
/* Estilos para el navbar */
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  border: 1px #545454;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

img {
  position: relative;
  width: 5em;
}

nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-transform: none;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 1000;
  background: transparent;
  transition: background-color 0.3s ease, border-radius 0.3s ease;
  padding: 0.5%;
}

nav.scrolled {
  background: #efefef;
  border-bottom: 1px #5454541a solid;
}

ul {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  list-style: none;
  padding: 2px 0;
  gap: 20px;
  margin-left: 15%;
}

li {
  font-weight: 500;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

a {
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
}

a.scrolled {
  color: rgb(138, 45, 45);
}

li:hover {
  transform: scale(1.1);
}

.cliente {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.cliente-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 5%;
}

.perfil-img {
  width: 36px;
}

.cesta-img {
  width: 25px;
}

button {
  background-color: #f44336;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}

@media (max-width: 800px) {
  nav {
    width: 90%;
    left: 5%;
    transform: none;
  }

  img {
    width: 27.5px;
  }

  li {
    font-size: 7.5px;
  }
}
</style>
