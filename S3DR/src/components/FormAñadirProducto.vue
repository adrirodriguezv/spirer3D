<template>
  <div class="container">
    <form @submit.prevent="submitProduct">
      <h2>Añadir producto a la BBDD</h2>
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
  padding: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-right: 15%;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

input, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #ddd;
  background-color: #f9f9f9;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #66afe9;
  outline: none;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  color: white;
  border: none;
  background-color: #545454;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3a3a3a;
}
</style>