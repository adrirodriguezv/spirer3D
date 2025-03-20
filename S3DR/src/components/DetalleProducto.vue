<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const producto = ref(null);

const obtenerProducto = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/productos/${route.params.id}`);
        producto.value = response.data;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
    }
};

onMounted(() => {
    obtenerProducto();
});

const agregarAlCarrito = () => {
    console.log('Producto añadido al carrito:', producto.value);
    // Aquí podrías implementar lógica para almacenar en Vuex, Pinia o LocalStorage
};
</script>

<template>
    <main v-if="producto">
        <h2>{{ producto.descripcion }}</h2>
        <img :src="`http://localhost:3000/images/${producto.imagen}`" alt="Imagen del producto">
        <button @click="agregarAlCarrito">Añadir al carrito</button>
    </main>
</template>
