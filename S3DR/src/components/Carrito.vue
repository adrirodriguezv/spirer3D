<template>
  <div class="carrito-container">
    <h2>Tu Carrito</h2>
    <div v-if="carritoStore.carrito.length > 0">
      <ul>
        <li v-for="producto in carritoStore.carrito" :key="producto.id">
          <div class="producto">
            <img :src="`http://localhost:3000/images/${producto.imagen}`" alt="Imagen del producto" />
            <div class="producto-info">
              <h3>{{ producto.nombre }}</h3>
              <p>Cantidad: {{ producto.cantidad }}</p>
              <button @click="eliminarProducto(producto.id)">Eliminar</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="acciones">
        <button @click="vaciarCarrito">Vaciar Carrito</button>
        <router-link to="/checkout">
          <button>Proceder a la compra</button>
        </router-link>
      </div>
    </div>
    <p v-else>No tienes productos en el carrito.</p>
  </div>
</template>

<script setup>
import { useCarritoStore } from '@/store/store.js';

const carritoStore = useCarritoStore();

const eliminarProducto = (productoId) => {
  carritoStore.eliminarDelCarrito(productoId);
};

const vaciarCarrito = () => {
  carritoStore.vaciarCarrito();
};
</script>

<style scoped>
.carrito-container {
  padding: 20px;
  margin-top: 5%;
}

.producto {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.producto img {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.producto-info {
  flex-grow: 1;
}

button {
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}

.acciones {
  margin-top: 20px;
}

.acciones button {
  margin-right: 10px;
}
</style>
