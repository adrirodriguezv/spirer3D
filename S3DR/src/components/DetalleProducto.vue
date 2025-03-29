<template>
  <div v-if="producto" class="container">
    <img :src="`http://localhost:3000/imgs/${producto.imagen}`" alt="Imagen del producto" />
    <div class="detalle-producto">
      <h2>{{ producto.nombre }}</h2>
      <p>{{ producto.descripcion }}</p>
      <RouterLink :to="`/productos`"><button>Volver</button></RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// Obtener los parámetros de la ruta (el id del producto)
const route = useRoute();
const producto = ref(null);

// Obtener los detalles del producto desde la API
onMounted(async () => {
  try {
    // Usar el id de la ruta para obtener el producto desde la API
    const response = await axios.get(`http://localhost:3000/api/productos/${route.params.id}`);
    producto.value = response.data;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
  }
});
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}

img {
  width: 35%;
}

.detalle-producto {
  padding: 15%;
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 5%;
  background-color: transparent;
  border: 1px #545454 solid;
  border-radius: 35px;
  padding: 3.5%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-transform: uppercase;
  font-weight: 700;
}

button:hover {
  transform: scale(1.1);
}
</style>
