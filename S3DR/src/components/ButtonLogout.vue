<template>
  <button @click="logout">Cerrar sesión</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  // Eliminar el token y tipo de usuario de localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('userType');

  // Redirigir al inicio o login
  router.push('/');
};
</script>

<style scoped>
button{
  margin-left: 15px;
  padding: 1%;
  border-radius: 10px;
  background-color: transparent;
  color: white;
  border: 2px white solid;
}
</style>