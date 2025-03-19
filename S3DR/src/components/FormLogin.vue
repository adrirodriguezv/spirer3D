<template>
    <div>
        <form @submit.prevent="login">
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
.login-container {
    max-width: 350px;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
    background: #f9f9f9;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.input-group {
    margin-bottom: 15px;
    text-align: left;
}

label {
    display: block;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.error {
    color: red;
    font-size: 14px;
}
</style>
