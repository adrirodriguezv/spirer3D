<template>
    <button @click="logout">Cerrar sesión</button>
  </template>
  
  <script setup>
  import { ref } from 'vue';
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
  