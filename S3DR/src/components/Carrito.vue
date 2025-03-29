<template>
  <div v-if="carritoStore.productos.length > 0">
    <h2>Carrito de Compras</h2>
    <div v-for="(producto, index) in carritoStore.productos" :key="producto.id">
      <div>
        <p>{{ producto.nombre }} - ${{ producto.precio }}</p>
        <p>Cantidad: {{ producto.cantidad }}</p>
        <button @click="eliminarProducto(producto.id)">Eliminar</button>
      </div>
    </div>
    <button @click="vaciarCarrito">Vaciar carrito</button>
  </div>
  <div v-else>
    <p>No tienes productos en tu carrito.</p>
  </div>
</template>

<script setup>
import { useCarritoStore } from '@/store/carrito';

const carritoStore = useCarritoStore();

const eliminarProducto = (productoId) => {
  carritoStore.eliminarProducto(productoId);
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
