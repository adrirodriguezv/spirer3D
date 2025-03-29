<template>
  <div v-if="producto" class="container">
    <img :src="`http://localhost:3000/images/${producto.imagen}`" alt="Imagen del producto" />
    <div class="detalle-producto">
      <h2>{{ producto.nombre }}</h2>
      <p>{{ producto.descripcion }}</p>
      <button @click="agregarAlCarrito">Añadir al carrito</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/composables/axios';  // Importa el axios configurado
import { useRoute } from 'vue-router';

const route = useRoute();
const producto = ref(null);

// Obtener el producto desde la API
onMounted(async () => {
  try {
    const response = await axios.get(`/productos/${route.params.id}`);
    producto.value = response.data;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
  }
});

// Definir las propiedades pasadas al componente
const props = defineProps({
  producto: Object,
});

// Estado para manejar la cantidad que ingresa el usuario
const cantidad = ref(1); // Inicializamos con 1 como valor predeterminado

// Función para agregar el producto al carrito
const agregarAlCarrito = async () => {
  try {
    // Verificamos que el producto y la cantidad sean válidos
    if (!cantidad.value || cantidad.value <= 0) {
      alert('Por favor ingresa una cantidad válida.');
      return;
    }

    const productoId = props.producto.id;
    const cantidadProducto = cantidad.value;

    // Realizamos la petición para agregar el producto al carrito
    const response = await axios.post('http://localhost:3000/api/carrito', {
      productoId,
      cantidad: cantidadProducto
    });

    // Confirmación en la consola o en la UI
    console.log('Producto agregado al carrito:', response);
    alert('Producto agregado al carrito con éxito');
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    alert('Hubo un error al agregar el producto al carrito');
  }
};
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
