<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importa useRouter para acceder al router
import axios from 'axios'; // Asegúrate de que axios está importado

const router = useRouter(); // Usamos useRouter() para acceder al router

const correo = ref('');
const contraseña = ref('');
const errorMessage = ref('');

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      correo: correo.value,
      contraseña: contraseña.value,
    });

    // Verifica si la respuesta tiene datos
    if (response && response.data) {
      const { token, userType } = response.data;

      // Guardar el token en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);

      // Redirigir según el tipo de usuario
      if (userType === 'admin') {
        router.push('/admin');  // Si es admin, redirige al admin
      } else {
        router.push('/');  // Si no es admin, redirige a la página principal
      }
    } else {
      errorMessage.value = 'No se recibió una respuesta válida del servidor';
    }
  } catch (error) {
    // Muestra un mensaje de error si la solicitud falla
    if (error.response) {
      // El servidor respondió con un error
      errorMessage.value = 'Error de inicio de sesión: ' + error.response.data.message;
    } else {
      // No se recibió respuesta del servidor (ejemplo: conexión rechazada)
      errorMessage.value = 'Error al conectar con el servidor';
    }
    console.error(error);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label for="correo">Correo</label>
        <input type="email" id="correo" v-model="correo" required />
      </div>
      <div>
        <label for="contraseña">Contraseña</label>
        <input type="password" id="contraseña" v-model="contraseña" required />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>

    <!-- Muestra el error si existe -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
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
    width: 35%;
    padding: 30px 25px;
    margin: 0 auto;
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
  </style>
  