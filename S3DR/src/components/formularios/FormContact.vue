<script setup></script>

<template>
  <section class="contact-section">
    <p>Contacta con nosotros para cualquier consulta o pregunta.</p>
    <form @submit.prevent="handleSubmit">
      <legend>Contacto</legend>
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
legend {
  color: rgba(255, 255, 255, 0.991);
  margin-left: 10px;
  padding: 15px;
  font-size: 1.2rem;
  background-color: rgb(97, 33, 33);
  border-radius: 50px;
  box-shadow: 3px 0px 7px #0003;
  position: relative;
  text-transform: uppercase;
  top: -55px;
  text-align: center;
  font-weight: 600;
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
  box-shadow: 15px 3px 20px #0004,
    -15px 0px 30px #0002;
    margin-top: 4%;
}

.form-group {
  width: 30%;
  display: flex;
  flex-direction: column;
}

label {
  text-align: left;
  font-size: 1rem;
  font-weight: 550;
}

input,
textarea {
  width: 334%;
  padding: 10px;
  font-size: 1rem;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 5px;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

textarea {
  height: 120px;
  resize: none;
}

button {
  width: 100%;
  padding: 12px 20px;
  font-size: 1rem;
  background-color: rgb(97, 33, 33);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: rgb(138, 45, 45);
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
