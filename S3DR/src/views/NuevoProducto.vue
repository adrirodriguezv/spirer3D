<script setup>
import NavegadorDark from '@/components/NavegadorDark.vue';
import FormAñadirProducto from '@/components/FormAñadirProducto.vue';
import FooterSection from '@/components/FooterSection.vue';
</script>

<template>
    <NavegadorDark />
    <div class="form-container">
        <FormAñadirProducto />
    </div>
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
