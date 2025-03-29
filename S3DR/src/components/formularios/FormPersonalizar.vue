<script setup>
import { ref } from 'vue';
import axios from 'axios';

const objectName = ref('');
const altura = ref('');
const anchura = ref('');
const profundidad = ref('');
const material = ref('');
const color = ref('');
const comments = ref('');

const sendOrder = async () => {
    try {
        const pedido = {
            objectName: objectName.value,
            altura: altura.value,
            anchura: anchura.value,
            profundidad: profundidad.value,
            material: material.value,
            color: color.value,
            comments: comments.value
        };

        await axios.post('http://localhost:3000/pedidos/crear', pedido);
        alert('Pedido enviado con éxito');
    } catch (error) {
        console.error('Error al enviar pedido:', error);
    }
};
</script>



<template>
  <section class="container">
    <h2>Persona<span class="span-text">lizar</span></h2>
    <div class="content">
      <p> En este formulario, podrás <span> crear una pieza única </span> que se ajuste exactamente a tus necesidades.
        Ya sea que estés
        diseñando un componente específico para tu proyecto, creando un accesorio para tu dispositivo, o simplemente
        quieras experimentar con diferentes formas y características, nuestro generador te permitirá personalizar tu
        pieza
        3D de forma fácil y rápida.</p>
      <form @submit.prevent="sendOrder">
        <legend> Datos del pedido</legend>

        <label>Nombre del objeto</label>
        <input type="text" v-model="objectName" required />

        <label>Altura</label>
        <input type="number" min="0" v-model="altura" placeholder="Cm" required />

        <label>Anchura</label>
        <input type="number" min="0" v-model="anchura" placeholder="Cm" required />

        <label>Profundidad</label>
        <input type="number" min="0" v-model="profundidad" placeholder="Cm" required />

        <label>Material</label>
        <select v-model="material" required>
          <option value="" disabled selected>Selecciona un material</option>
          <option value="PLA">PLA</option>
          <option value="PETG">PETG</option>
          <option value="TPU">TPU (Flexible)</option>
        </select>

        <label>Color</label>
        <select v-model="color" required>
          <option value="" disabled selected>Selecciona un color</option>
          <option value="Negro">Negro</option>
          <option value="Rojo">Rojo</option>
          <option value="Dorado">Dorado</option>
          <option value="Blanco">Blanco</option>
          <option value="Amarillo">Amarillo</option>
          <option value="Marron">Marron</option>
        </select>

        <label>Adjuntar imagen</label>
        <input type="file" @change="handleFileUpload" accept="image/*" />


        <label>Comentarios adicionales</label>
        <textarea v-model="comments" placeholder="Descripción adicional"></textarea>


        <!-- Botón para enviar el pedido -->
        <button type="submit">Confirmar Pedido</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  /* Centra horizontalmente */
  padding: 5%;
  margin-top: 5%;
  margin-bottom: 15%;
}

h2 {
    color: rgb(138, 45, 45);
    text-transform: uppercase;
    font-style: italic;
    text-align: left;
    margin-left: 10%;
    margin-right: 8%;
    margin-bottom: -4%;
}

.span-text{
    font-weight: 400;
    color: rgb(138, 45, 45);
}

h3 {
  font-size: 150%;
  text-transform: uppercase;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

/* Estilos generales */
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
}

/* Estilo para etiquetas */
label {
  font-size: 1rem;
  font-weight: 550;
}

/* Estilo para inputs y select */
input,
select,
textarea {
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

/* Transiciones al enfocar */
input:focus,
select:focus,
textarea:focus {
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* Estilo para textarea */
textarea {
  height: 120px;
  resize: none;
}

/* Estilo del botón */
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

p {
  width: 50%;
  text-align: center;
  font-size: 120%;
  color: rgb(83, 83, 83);
  margin-top: 5%;
}

span {
  color: rgb(138, 45, 45);
  font-weight: bold;
}
</style>
