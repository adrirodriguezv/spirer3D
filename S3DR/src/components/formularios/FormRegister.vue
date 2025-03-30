<script setup></script>
<template>
    <div class="container">
      <div class="logo">
        <RouterLink :to="`/`">
          <img src="../../../public/Logo3D.png">
        </RouterLink>
      </div>
  
  
      <div class="linea-vertical"></div>
  
      <div>
        <form @submit.prevent="login">
          <div>
            <label for="correo">Nombre</label>
            <input type="nombre" id="nombre" v-model="nombre" required />
          </div>
          <div>
            <label for="contraseña">Apellido</label>
            <input type="text" id="apellido" v-model="apellido" required />
          </div>
          <div>
            <label for="contraseña">Correo</label>
            <input type="text" id="correo" v-model="correo" required />
          </div>
          <div>
            <label for="contraseña">Contraseña</label>
            <input type="password" id="contraseña" v-model="contraseña" required />
          </div>
          <div>
            <label for="contraseña">Confirmar contraseña</label>
            <input type="password" id="contraseña" v-model="contraseña" required />
          </div>
          <button type="submit">Registrarme</button>
          <p>¿Ya tienes una cuenta?<RouterLink :to="`/login`">Iniciar sesión</RouterLink>
          </p>
        </form>
  
        <!-- Muestra el error si existe -->
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
  
  legend {
    color: rgba(255, 255, 255, 0.991);
    margin-left: 10px;
    padding: 15px;
    font-size: 1.2rem;
    background-color: rgb(97, 33, 33);
    border-radius: 50px;
    box-shadow: 3px 0px 7px #0003;
    position: relative;
    text-transform: uppercase;
    top: -55px;
    text-align: center;
    font-weight: 600;
  }
  
  form {
    width: 85%;
    padding: 30px 25px;
    margin: 0 auto;
    margin-left: 30%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: Arial, sans-serif;
    border: 3px white solid;
    background-color: rgba(255, 255, 255, 0.329);
    box-shadow: 15px 3px 20px #0004, -15px 0px 30px #0002;
    margin-top: 4%;
  }
  
  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    text-align: left;
    font-size: 1rem;
    font-weight: 550;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 2px solid rgb(255, 255, 255);
    border-radius: 5px;
    background: transparent;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
  }
  
  input:focus {
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  
  button {
    width: 100%;
    padding: 12px 20px;
    font-size: 1rem;
    background-color: rgb(97, 33, 33);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: rgb(138, 45, 45);
  }
  
  textarea::placeholder,
  input::placeholder {
    font-weight: 300;
    font-style: italic;
    font-size: 85%;
  }
  
  .linea-vertical {
    background-color: rgba(0, 0, 0, 0.171);
    width: 1.5px;
    height: 400px;
  }
  
  img {
    width: 50%;
    margin-left: 23%;
  }
  
  .error {
    color: red;
    font-size: 14px;
  }
  
  .linea-vertical {
    background-color: rgba(0, 0, 0, 0.253);
    width: 1px;
    height: 600px;
  }
  
  .logo {
    width: 20%;
    margin-right: 20%;
  }
  
  .logo img {
    width: 80%;
  }
  </style>