import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    productoSeleccionado: '',
    objectName: '',
    altura: null,   // Establecer como null o 0 si es necesario
    anchura: null,  // Lo mismo aquí
    profundidad: null,  // Y lo mismo para este
    material: '',
    color: '',
    comments: '',
    textQR: '',
    precioProducto: 0,
    tamanyo: '',
    imagen: '',
    usuarioId: 0,
    productoId: 0,
    metodoPago: '',
  }),
  actions: {
    setProductoSeleccionado(producto) {
        this.productoSeleccionado = producto;
      },
      // Función para guardar el precio del producto
      setPrecioProducto(precio) {
        this.precioProducto = precio;
      },
    setOrder(data) {
      // Guardar los datos del pedido en el store
      this.objectName = data.objectName;
      this.altura = data.altura;
      this.anchura = data.anchura;
      this.profundidad = data.profundidad;
      this.material = data.material;
      this.color = data.color;
      this.comments = data.comments;
      this.textQR = data.textQR;
      this.tamanyo = data.tamanyo;
      this.imagen = data.imagen;
    },
  },
  getters: {
    getOrder: (state) => state,
  }
});
