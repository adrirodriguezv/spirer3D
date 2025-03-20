<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Preloader from './components/Preloader.vue';
import Navegador from './components/Navegador.vue';
import Footer from './components/FooterSection.vue';
import FooterSection from './components/FooterSection.vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false; // Oculta el preloader después de 3 segundos
  }, 1000);
});
</script>

<template>
  <div>
    <Preloader v-if="isLoading" />
    <div v-else>
      <RouterView/>
    </div>
  </div>
</template>
