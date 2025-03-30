<script setup>
import FooterSection from '@/components/FooterSection.vue';
import Navegador from '@/components/Navegador.vue';
</script>

<template>
    <Navegador />
    <div class="container">
        <div class="buttons">
            <RouterLink :to="`/nuevoProducto`"><button class="addProduct">Añadir producto</button></RouterLink>
            <RouterLink :to="`/nuevoProducto`"><button class="addProduct">Añadir producto</button></RouterLink>
            <RouterLink :to="`/nuevoProducto`"><button class="addProduct">Añadir producto</button></RouterLink>
            <RouterLink :to="`/nuevoProducto`"><button class="addProduct">Añadir producto</button></RouterLink>
        </div>
    </div>
    <FooterSection />
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10%;
    margin-bottom: 10%;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    gap: 150px;

}

.addProduct {
    padding: 50%;
    margin-bottom: -55%;
    text-transform: uppercase;
    border-radius: 15px;
    border: none;
    background-color: rgb(97, 33, 33);
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
}

.addProduct:hover {
    background-color: rgb(138, 45, 45);
    transform: scale(1.1);
}
</style>
