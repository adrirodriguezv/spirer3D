<script setup>
import { ref } from 'vue';

// Variables reactivas para los datos del formulario
const objectName = ref('');
const dimensions = ref('');
const material = ref('');
const color = ref('');
const file = ref(null);
const comments = ref('');

// Manejo del archivo seleccionado
const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

// Función para enviar el pedido
const sendOrder = async () => {
  const formData = new FormData();
  formData.append('objectName', objectName.value);
  formData.append('dimensions', dimensions.value);
  formData.append('material', material.value);
  formData.append('color', color.value);
  formData.append('file', file.value);
  formData.append('comments', comments.value);

  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error('Error al enviar el pedido:', error);
  }
};
</script>

<template>
  <section>
    <h2>Personaliza tu pedido</h2>
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
      <input type="text" v-model="color" required />

      <label>Sube tu archivo 3D (.jpg, .jpeg)</label>
      <input type="file" @change="handleFileUpload" accept=".jpg, .jpeg" required />

      <label>Comentarios adicionales</label>
      <textarea v-model="comments" placeholder="Descripción adicional"></textarea>

      <button type="submit">Enviar pedido</button>
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
    border: 2px white solid;
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
    border: 2px solid rgba(255, 255, 255, 0.5);
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

button:active {
    background-color: #388e3c;
}

textarea::placeholder, input::placeholder{
    font-weight: 300;
    font-style: italic;
    font-size: 85%;
}
</style>
