<template>
  <header>
    <nav>
      <!-- Icono de hamburguesa / cruz -->
      <div class="hamburger" @click="toggleMenu">
        <div :class="{'line': true, 'open': menuOpen}"></div>
        <div :class="{'line': true, 'open': menuOpen}"></div>
        <div :class="{'line': true, 'open': menuOpen}"></div>
      </div>

      <!-- Menú desplegable -->
      <ul :class="{'active': menuOpen}">
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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore'; // Asegúrate de importar el store

const router = useRouter(); // Para redirigir
const authStore = useAuthStore(); // Usa el store de autenticación

const isAuthenticated = computed(() => authStore.token !== null);
const userType = computed(() => authStore.userType);

const menuOpen = ref(false); // Estado para controlar si el menú está abierto o cerrado

// Función para cerrar sesión
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
  router.push('/');
};

// Función para alternar la visibilidad del menú en pantallas pequeñas
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
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
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
  transition: background-color 0.3s ease, border-radius 0.3s ease;
  padding: 0.5%;
}

/* Estilo para el icono hamburguesa */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  width: 30px;
  cursor: pointer;
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 1100;
}

.hamburger .line {
  height: 1px;
  width: 30px;
  background-color: #000;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.hamburger .open:nth-child(1) {
  transform: rotate(45deg) translateY(10px);
}

.hamburger .open:nth-child(2) {
  opacity: 0;
}

.hamburger .open:nth-child(3) {
  transform: rotate(-45deg) translateY(-10px);
}

/* Estilo del menú lateral */
ul.active {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(172, 11, 11);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  list-style: none;
  padding: 0;
  z-index: 1000;
  opacity: 1;
  animation: slideIn 0.5s ease-out;
}

/* Fondo rojo y texto blanco */
ul li {
  font-size: 2rem;
  text-align: center;
}

ul a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

/* Animación de apertura */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Hacer el menú invisible cuando no está abierto */
ul {
  display: none;
  position: absolute; /* Establecerlo como absoluto para que ocupe toda la pantalla */
  top: 0;
  left: 0;
}

/* Mostrar el menú cuando está activo en pantallas pequeñas */
@media (max-width: 800px) {
  ul.active {
    display: flex;
  }

  nav {
    width: 100%;
  }

  /* Redimensionar icono de hamburguesa en pantallas pequeñas */
  .hamburger {
    left: 15px;
    top: 15px;
  }

  img {
    width: 27.5px;
  }

  li {
    font-size: 7.5px;
  }
}
</style>
