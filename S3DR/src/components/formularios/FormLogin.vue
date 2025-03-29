<template>
    <div class="container">

        <div class="logo">
            <RouterLink to="/">
                <img src="/Logo3D.png" alt="Logo">
            </RouterLink>
        </div>

        <div class="linea-vertical"></div>

        <form @submit.prevent="login">
            <legend>Inicia Sesión</legend>
            <label>Correo</label>
            <input v-model="correo" type="email" placeholder="Correo" required />
            <label>Contraseña</label>
            <input v-model="contraseña" type="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
        </form>

        <!-- Mostrar mensaje de error si el login falla -->
        <div v-if="errorMessage" class="error-message">
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Variables para los campos de correo, contraseña y para manejar el error
const correo = ref('');
const contraseña = ref('');
const errorMessage = ref('');
const router = useRouter();

// Función para el login
const login = async () => {
  try {
    // Hacer la solicitud POST al backend
    const response = await axios.post('http://localhost:3000/api/login', {
      correo: correo.value,
      contraseña: contraseña.value,
    });

    // Guardar el token y el tipo de usuario en localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userType', response.data.tipo_usuario);


    // Redirigir según el tipo de usuario
    if (response.data.tipo_usuario === 'admin') {
      router.push('/admin'); // Redirigir al admin
    } else {
      router.push('/'); // Redirigir al usuario normal
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
    errorMessage.value = error.response ? error.response.data.message : 'Error desconocido. Por favor, intenta de nuevo.';
  }
};
</script>



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
    box-shadow: 15px 3px 20px #0004,
        -15px 0px 30px #0002;
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
