import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    objectName: '',
    altura: '',
    anchura: '',
    profundidad: '',
    material: '',
    color: '',
    comments: '',
  }),
  actions: {
    setOrder(data) {
      this.objectName = data.objectName;
      this.altura = data.altura;
      this.anchura = data.anchura;
      this.profundidad = data.profundidad;
      this.material = data.material;
      this.color = data.color;
      this.comments = data.comments;
    },
  },
});
