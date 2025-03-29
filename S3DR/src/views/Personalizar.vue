<script setup>
import FormPersonalizar from '@/components/formularios/FormPersonalizar.vue';
import NavegadorDark from '@/components/NavegadorDark.vue';
import FooterSection from '@/components/FooterSection.vue';

</script>

<template>
  <NavegadorDark/>
  <FormPersonalizar/>
  <FooterSection/>
</template>

<style scoped>
section {
    margin-top: 10%;
    margin-bottom: 15%;
}

h2{
    text-align: center;
    margin-bottom: 2.5%;
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
}

/* Estilo para etiquetas */
label {
    font-size: 1rem;
    font-weight: bold;
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
