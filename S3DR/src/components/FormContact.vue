<script setup></script>

<template>
  <section class="contact-section">
    <h2>Contacto</h2>
    <p>Contacta con nosotros para cualquier consulta o pregunta.</p>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="name" placeholder="Tu nombre" required />
      </div>
      
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="email" placeholder="Tu correo" required />
      </div>

      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" v-model="message" placeholder="Escribe tu mensaje" required></textarea>
      </div>

      <button type="submit">Enviar</button>
    </form>
  </section>
</template>

<style scoped>
.contact-section {
  margin: 2%;
  margin-top: 10%;
  margin-bottom: 10%;
  text-align: center;
  padding: 40px;
  border-radius: 10px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
}

p {
  font-size: 1rem;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.form-group {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus {
  border-color: white;
}

button {
  padding: 12px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #388e3c;
}
</style>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');

const handleSubmit = () => {
  // Lógica de envío del formulario (simulada)
  alert(`Formulario enviado:
  Nombre: ${name.value}
  Email: ${email.value}
  Mensaje: ${message.value}`);
};
</script>
