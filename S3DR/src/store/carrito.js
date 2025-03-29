// src/store/carrito.js
import { defineStore } from 'pinia';
import axios from '@/composables/axios';

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    productos: [],
  }),
  actions: {
    async obtenerCarrito() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/carrito', { headers: { Authorization: `Bearer ${token}` } });
        this.productos = response.data.productos;
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    },
    async agregarProducto(productoId, cantidad) {
      const token = localStorage.getItem('token');
      try {
        await axios.post('/carrito', { productoId, cantidad }, { headers: { Authorization: `Bearer ${token}` } });
        this.obtenerCarrito();  // Actualiza el carrito
      } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
      }
    },
    async eliminarProducto(productoId) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`/carrito/${productoId}`, { headers: { Authorization: `Bearer ${token}` } });
        this.obtenerCarrito();  // Actualiza el carrito
      } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
      }
    },
    async vaciarCarrito() {
      const token = localStorage.getItem('token');
      try {
        await axios.delete('/carrito', { headers: { Authorization: `Bearer ${token}` } });
        this.productos = [];  // Vaciar el carrito en el estado
      } catch (error) {
        console.error('Error al vaciar el carrito:', error);
      }
    },
  },
});
