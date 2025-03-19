<script setup>
import FormAñadirProducto from '@/components/FormAñadirProducto.vue';
import NavegadorDark from '@/components/NavegadorDark.vue';
</script>

<template>
    <div class="container">
        <NavegadorDark />
        <div class="buttons">
            <RouterLink :to="`/nuevoProducto`"><button class="addProduct">Añadir producto</button></RouterLink>
            <RouterLink :to="`/nuevoProducto`"><button class="addProduct">Añadir producto</button></RouterLink>
            <RouterLink :to="`/nuevoProducto`"><button class="addProduct">Añadir producto</button></RouterLink>
            <RouterLink :to="`/nuevoProducto`"><button class="addProduct">Añadir producto</button></RouterLink>
        </div>
    </div>
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
    background-color: blueviolet;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
}

.addProduct:hover {
    background-color: darkviolet;
    transform: scale(1.1);
}
</style>
