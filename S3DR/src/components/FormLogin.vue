<template>
    <div>
        <form @submit.prevent="login">
            <h2>Inicia Sesión</h2>
            <input v-model="correo" type="email" placeholder="Correo" required />
            <input v-model="contraseña" type="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const correo = ref('');
const contraseña = ref('');
const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/login', {
            correo: correo.value,
            contraseña: contraseña.value,
        });

        // Guardar token y tipo de usuario
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', response.data.tipo_usuario);

        // Redirigir según el tipo de usuario
        if (response.data.tipo_usuario === 'admin') {
            router.push('/');
        } else {
            alert('No se ha podido iniciar sesión')
            router.push('/login');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
    }
};
</script>



<style scoped>
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
    margin-top: 5%;
}

h2{
    text-transform: uppercase;
    color: white;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.514);
}

.input-group {
    margin-bottom: 15px;
    text-align: left;
}

label {
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
  background-color: #5454546b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
    background-color: #545454bd;
}

textarea::placeholder, input::placeholder{
    font-weight: 300;
    font-style: italic;
    font-size: 85%;
}
.error {
    color: red;
    font-size: 14px;
}
</style>
