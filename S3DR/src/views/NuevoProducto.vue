<script setup>
import Navegador from '@/components/Navegador.vue';
import FormAñadirProducto from '@/components/formularios/FormAñadirProducto.vue';
import FooterSection from '@/components/FooterSection.vue';
</script>

<template>
    <Navegador />
    <div class="form-container">
        <FormAñadirProducto />
    </div>
    <FooterSection/>
</template>

<style scoped>
.form-container {
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center;     /* Centra verticalmente */
    margin-top: 10%;         /* Separación desde el inicio de la página */
    margin-bottom: 10%;      /* Separación desde el final de la página */
}
</style>
