import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormStore = defineStore('formStore', () => {
  const objectName = ref('');
  const altura = ref('');
  const anchura = ref('');
  const profundidad = ref('');
  const material = ref('');
  const color = ref('');
  const comments = ref('');

  // Función para establecer los datos del formulario
  const setFormData = (formData) => {
    objectName.value = formData.objectName;
    altura.value = formData.altura;
    anchura.value = formData.anchura;
    profundidad.value = formData.profundidad;
    material.value = formData.material;
    color.value = formData.color;
    comments.value = formData.comments;
  };

  return {
    objectName,
    altura,
    anchura,
    profundidad,
    material,
    color,
    comments,
    setFormData,
  };
});
