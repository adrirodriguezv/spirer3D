<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFormStore } from '../store/store'; // Importar el store de Pinia

// Variables del formulario
const objectName = ref('');
const altura = ref('');
const anchura = ref('');
const profundidad = ref('');
const material = ref('');
const color = ref('');
const comments = ref('');

// Crear una instancia del store
const router = useRouter();  // Instancia del router
const store = useFormStore();


// Función para enviar el pedido y almacenar los datos en el store
const sendOrder = () => {
  // Validar que todos los campos estén completos
  if (!objectName.value || !altura.value || !anchura.value || !profundidad.value || !material.value || !color.value) {
    alert('Por favor, completa todos los campos');
    return;
  }

  // Guardar los datos en el store
  store.setFormData({
    objectName: objectName.value,
    altura: altura.value,
    anchura: anchura.value,
    profundidad: profundidad.value,
    material: material.value,
    color: color.value,
    comments: comments.value,
  });

  // Redirigir a la página de confirmación
  
  router.push('/confirmarPedido');
};
</script>

<template>
  <section class="container">
    <h2>Datos del Pedido</h2>
    <form @submit.prevent="sendOrder">
    
      <label>Nombre del objeto</label>
      <input type="text" v-model="objectName" required />

      <label>Altura</label>
      <input type="number" v-model="altura" placeholder="Cm" required />

      <label>Anchura</label>
      <input type="number" v-model="anchura" placeholder="Cm" required />

      <label>Profundidad</label>
      <input type="number" v-model="profundidad" placeholder="Cm" required />

      <label>Material</label>
      <select v-model="material" required>
        <option value="" disabled selected>Selecciona un material</option>
        <option value="PLA">PLA</option>
        <option value="PETG">PETG</option>
        <option value="TPU">TPU (Flexible)</option>
      </select>

      <label>Color</label>
      <select v-model="color" required>
        <option value="" disabled selected>Selecciona un color</option>
        <option value="Negro">Negro</option>
        <option value="Rojo">Rojo</option>
        <option value="Dorado">Dorado</option>
        <option value="Blanco">Blanco</option>
        <option value="Amarillo">Amarillo</option>
        <option value="Marron">Marron</option>
      </select>

      <label>Comentarios adicionales</label>
      <textarea v-model="comments" placeholder="Descripción adicional"></textarea>

      <!-- Botón para enviar el pedido -->
      <button type="submit">Confirmar Pedido</button>
    </form>
  </section>
</template>

<style scoped>
section {
    margin-top: 10%;
    margin-bottom: 15%;
}

h2 {
    text-align: left;
    margin-left: 10%;
    margin-right: 8%;
    border-bottom: 1px #5454546b solid ;
}

/* Estilos generales */
form {
    width: 35%;
    padding: 30px 25px;
    margin: 0 auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: Arial, sans-serif;
    border: 3px white solid;
    background-color: rgba(255, 255, 255, 0.329);
    margin-top: 5%;
}

/* Estilo para etiquetas */
label {
    font-size: 1rem;
    font-weight: 550;
}

/* Estilo para inputs y select */
input,
select,
textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 2px solid rgb(255, 255, 255);
    border-radius: 5px;
    background: transparent;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
}

/* Transiciones al enfocar */
input:focus,
select:focus,
textarea:focus {
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* Estilo para textarea */
textarea {
    height: 120px;
    resize: none;
}

/* Estilo del botón */
button {
  width: 100%;
  padding: 12px 20px;
  font-size: 1rem;
  background-color: #5454546b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
    background-color: #545454bd;
}

textarea::placeholder, input::placeholder{
    font-weight: 300;
    font-style: italic;
    font-size: 85%;
}
</style>
