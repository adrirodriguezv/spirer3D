<script setup>
import { ref, onMounted } from 'vue';

const isScrolled = ref(false);

const checkScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});
</script>

<template>
  <header>
    <nav :class="{ 'scrolled': isScrolled }" id="nav">
      <ul>
        <div><RouterLink :to="`/`"><img src="/Logo3D.png"></RouterLink></div>
        <li><RouterLink :to="`/`">Inicio</RouterLink></li>
        <li><RouterLink :to="`/impresiones`">Impresiones</RouterLink></li>
        <li><RouterLink :to="`/precio`">Precios</RouterLink></li>
        <li><RouterLink :to="`/personalizar`">Personalizar</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
* {
  border: 1px #545454;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

img {
  position: relative;
  width: 5em;
}

nav {
  text-transform: none;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%); /* Centra el nav horizontalmente */
  width: 60%; /* Ajusta el ancho según el contenido */
  z-index: 1000;
  background: transparent; /* Fondo transparente por defecto */
  color: white;
  transition: background-color 0.3s ease, border-radius 0.3s ease; /* Transición suave */
  border-radius: 40px 40px; /* Bordes redondeados */
  margin-top: 2%;
}

nav.scrolled {
  background: rgb(61, 61, 61, 0.7); /* Fondo oscuro con opacidad */
  border-radius: 40px 40px; /* Bordes redondeados */
}

ul {
  display: flex;
  justify-content: space-around;
  width: 100%; /* Hace que los elementos se distribuyan uniformemente */
  list-style: none;
  padding: 0;
  
}

li {
  font-weight: 500;
  margin-top: 3%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
}

a {
  text-decoration: none;
  color: white;
  padding: 10px 15px; /* Añadir padding a los enlaces */
  transition: color 0.3s ease; /* Transición suave al hacer hover */
}

li:hover {
  transform: scale(1.1);
}

@media (max-width: 800px) {
  nav {
    width: 90%;
    left: 5%; /* Mantiene el margen lateral */
    transform: none; /* Sin transformación */
  }

  img {
    width: 27.5px;
  }

  li {
    font-size: 7.5px;
  }
}
</style>
