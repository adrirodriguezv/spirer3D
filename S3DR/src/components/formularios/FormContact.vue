<script setup>
import { ref } from 'vue';
import emailjs from 'emailjs-com';  // Importamos EmailJS

const name = ref('');
const email = ref('');
const message = ref('');

const handleSubmit = () => {
  // Creamos los parámetros que se enviarán a la plantilla de EmailJS
  const templateParams = {
    name: name.value,
    email: email.value,
    message: message.value
  };

  // Usamos el método `send` de EmailJS
  emailjs.send('service_kolvt2e', 'template_xyua9km', templateParams, '0z3N1h964PbVdv6r2')
    .then((response) => {
      alert('¡Correo enviado exitosamente!');
    })
    .catch((error) => {
      alert('Error al enviar el correo: ' + error.text);
    });
};
</script>

<template>
  <section class="contact-section">
    <h2>Contacto</h2>
    <p>Contacta con nosotros para cualquier consulta o pregunta. Pide tu presupuesto.</p>
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
    font-size: 300%;
    color: rgb(77, 77, 77);
    text-transform: uppercase;
    text-align: center;
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
  background-color: rgb(172, 11, 11);
  box-shadow: 15px 3px 20px #0004,
    -15px 0px 30px #0002;
    margin-top: 4%;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: 550;
  text-align: left;
  margin-top: 2%;
  color: white;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.674);
  border-radius: 20px;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
  margin-top: 1%;
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
  background-color: rgba(0, 0, 0, 0.219);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
  font-weight: 600;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.438);
}

textarea::placeholder,
input::placeholder {
  font-weight: 300;
  font-style: italic;
  font-size: 85%;
  color: white;
}


</style>

