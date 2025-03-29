<template>
  <div class="container">
    <form @submit.prevent="submitProduct">
      <legend>Añadir producto a la BBDD</legend>
      <label for="productName">Nombre del Producto:</label>
      <input type="text" v-model="product.nombre" id="productName" required />

      <label for="productDescription">Descripción:</label>
      <textarea v-model="product.descripcion" id="productDescription" required></textarea>

      <label for="productImage">Nombre del archivo de la Imagen:</label>
      <input type="text" v-model="product.imagen" id="productImage" required />

      <button type="submit">Añadir Producto</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const product = ref({
  nombre: '',
  descripcion: '',
  imagen: ''
});

const submitProduct = async () => {
  try {
    const response = await axios.post('http://localhost:3000/productos', product.value);
    alert('Añadido a la BBDD');
    console.log('Producto añadido:', response.data);
  } catch (error) {
    alert('No se ha podido añadir a la BBDD');
    console.error('Error al añadir producto:', error);
  }
};

</script>

<style scoped>

form {
  width: 100%;
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

input,
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

input:focus,
textarea:focus {
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

textarea {
  height: 120px;
  resize: none;
}

label {
  text-align: left;
  font-size: 1rem;
  font-weight: 550;
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
</style>