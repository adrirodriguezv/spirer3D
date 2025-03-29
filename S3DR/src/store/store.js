// stores/store.js
import { defineStore } from 'pinia';
import axios from '@/composables/axios.js';

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    carrito: [],
  }),

  actions: {
    // Cargar el carrito desde la API (cuando el componente se monta)
    async cargarCarrito() {
      try {
        const response = await axios.get('http://localhost:3000/api/carrito');
        this.carrito = response.data.productos;
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    },

    // Agregar producto al carrito
    async agregarProducto(producto) {
      try {
        // Aquí podrías hacer una solicitud POST para agregar al carrito en el backend
        const response = await axios.post('http://localhost:3000/api/carrito', {
          productoId: producto.id,
          cantidad: 1,  // Puedes permitir a los usuarios elegir la cantidad
        });
        this.carrito.push(producto); // Actualizar el carrito localmente
      } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        throw error;
      }
    },

    // Eliminar un producto del carrito
    async eliminarDelCarrito(productoId) {
      try {
        await axios.delete(`http://localhost:3000/api/carrito/${productoId}`);
        this.carrito = this.carrito.filter((producto) => producto.id !== productoId);
      } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
      }
    },

    // Vaciar el carrito (eliminar todos los productos)
    async vaciarCarrito() {
      try {
        for (const producto of this.carrito) {
          await axios.delete(`/api/carrito/${producto.id}`);
        }
        this.carrito = [];  // Vaciar el estado local
      } catch (error) {
        console.error('Error al vaciar el carrito:', error);
      }
    },
  },
});
