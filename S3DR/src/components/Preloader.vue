<template>
    <div id="preloader">
      <img src="/public/Logo3D.png" alt="Cargando" class="logo" />
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  #preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .logo {
    width: 130px; 
    height: 130px;
    animation: spin 2s linear infinite; 
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  