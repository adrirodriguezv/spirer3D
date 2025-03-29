<script setup>
import { ref } from 'vue';
import { useFormStore } from '../store/store'; // Importar el store de Pinia

// Crear una instancia del store
const store = useFormStore();

// Variables del formulario
const nombre = ref('');
const apellidos = ref('');
const email = ref('');
const direccion = ref('');
const ciudad = ref('');
const codigoPostal = ref('');

const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};
</script>

<template>
    <section class="container">
        <form>
            <h2>Datos Personales</h2>
            <label>Nombre</label>
            <input type="text" v-model="nombre" required />

            <label>Apellidos</label>
            <input type="text" v-model="apellidos" required />

            <label>Correo Electrónico</label>
            <input type="email" v-model="email" required />

            <label>Dirección</label>
            <input type="text" v-model="direccion" required />

            <label>Ciudad</label>
            <input type="text" v-model="ciudad" required />

            <label>Código Postal</label>
            <input type="text" v-model="codigoPostal" required />

            <button type="submit">Confirmar Pedido</button>
        </form>

        <div class="linea-vertical"></div>

        <div class="cesta">
            <div class="intro">
                <img src="../assets/img/pedido.png">
                <h2>Mi Pedido</h2>
            </div>

            <p><strong>Objeto:</strong> {{ store.objectName }}</p>
            <p><strong>Altura:</strong> {{ store.altura }} cm</p>
            <p><strong>Anchura:</strong> {{ store.anchura }} cm</p>
            <p><strong>Profundidad:</strong> {{ store.profundidad }} cm</p>
            <p><strong>Material:</strong> {{ store.material }}</p>
            <p><strong>Color:</strong> {{ store.color }}</p>
            <p><strong>Comentarios:</strong> {{ store.comments }}</p>
        </div>
    </section>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 90%;
    margin: 5% auto;
    margin-top: 10%;
}

form {
    width: 45%;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-right: 4%;
}

input {
    width: 100%;
    border: none;
    padding: 1%;
    border-radius: 10px;
    border: 2px white solid;
    background-color: transparent;
}

button {
    width: 102.5%;
    padding: 2%;
    border-radius: 50px;
    color: white;
    border: none;
    background-color: #54545472;
    margin-top: 2%;
    transition: 0.3s;
}

button:hover {
    background-color: #545454bd;
}

.linea-vertical {
    width: 1.5px;
    height: 700px;
    background-color: #5454546b;
}

.cesta {
    width: 30%;
    padding: 20px;
    border-radius: 10px;
    align-items: center;
    margin-left: 4%;
}

.cesta p {
    margin-top: 2%;
}

.cesta strong {
    font-weight: 550;
}
.intro{
    display: flex;
    align-items: center;
}
.cesta img {
    width: 10%;
}
</style>
