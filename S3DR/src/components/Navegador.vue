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
        <div>
          <RouterLink :class="{ 'scrolled': isScrolled }" :to="`/`"><img src="/Logo3D.png"></RouterLink>
        </div>
        <li>
          <RouterLink :class="{ 'scrolled': isScrolled }" :to="`/`">Inicio</RouterLink>
        </li>
        <li>
          <RouterLink :class="{ 'scrolled': isScrolled }" :to="`/productos`">Productos</RouterLink>
        </li>
        <li>
          <RouterLink :class="{ 'scrolled': isScrolled }" :to="`/precio`">Precios</RouterLink>
        </li>
        <li>
          <RouterLink :class="{ 'scrolled': isScrolled }" :to="`/personalizar`">Personalizar</RouterLink>
        </li>
        <li>
          <RouterLink :class="{ 'scrolled': isScrolled }" :to="`/contacto`">Contacto</RouterLink>
        </li>
      </ul>
      <ul class="cliente-container">
        <div class="cliente">
          <img src="../assets/img/perfil.png" class="perfil-img">
          <img src="../assets/img/cesta.png" class="cesta-img">
        </div>
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-transform: none;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 1000;
  background: transparent;
  transition: background-color 0.3s ease, border-radius 0.3s ease;
  padding: 0.5%;
}

nav.scrolled {
  background: #efefef;
  /* Fondo oscuro con opacidad */
  border-bottom: 1px #5454541a solid;
}

ul {
  display: flex;
  justify-content: flex-start;
  /* Centra los elementos */
  align-items: center;
  /* Alinea los elementos verticalmente */
  width: 100%;
  /* Asegura que ocupe el ancho completo */
  list-style: none;
  padding: 2px 0;
  gap: 20px;
  /* Espaciado entre elementos */
  margin-left: 15%;
}

li {
  font-weight: 500;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

a {
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
  /* Transición suave al hacer hover */
}

a.scrolled {
  color: #545454;
}

li:hover {
  transform: scale(1.1);
}

.cliente {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.cliente-container{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 5%;
}

.perfil-img {
  width: 36px;
}

.cesta-img {
  width: 25px;

}

@media (max-width: 800px) {
  nav {
    width: 90%;
    left: 5%;
    /* Mantiene el margen lateral */
    transform: none;
    /* Sin transformación */
  }

  img {
    width: 27.5px;
  }

  li {
    font-size: 7.5px;
  }
}
</style>
