<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const productos = ref([]);

const obtenerProductos = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/productos');
        productos.value = response.data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};

onMounted(() => {
    obtenerProductos();
});
</script>
<template>
    <main>
        <section class="container-top">
            <h2>Prod<span>uctos</span></h2>
            <div class="container">
                <article v-for="producto in productos" :key="producto.id" class="card">
                    <RouterLink :to="`/detalleProducto/${producto.id}`">
                        <div class="product-image">
                            <img :src="`http://localhost:3000/imgs/${producto.imagen}`" alt="Imagen del producto">
                        </div>
                        <div class="product-info">
                            <p>{{ producto.descripcion }}</p>
                            <div class="linea-horizontal"></div>
                        </div>
                    </RouterLink>
                </article>
            </div>
        </section>
    </main>
</template>

<style scoped>
.container-top {
    margin-top: 10%;
    margin-bottom: 10%;
}

a {
    text-decoration: none;
}

img {
    width: 100%;
    user-select: none;
}

.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* Cuatro columnas */
    gap: 2rem;
    /* Espacio entre tarjetas */
    margin: 5%;
    margin-top: 20%;

}

.card {
    position: relative;
    padding: 1rem;
    border-radius: 0.9rem;
    color: var(--text);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

}

.product-image {
    width: 100%;
    transition: transform 500ms ease-in-out;
    filter: drop-shadow(5px 10px 15px rgba(8, 9, 13, 0.4));
}

.card:hover .product-image {
    transform: scale(1.1);
}

.product-info {
    margin-top: 1rem;
    text-align: left;
    margin-bottom: 3.5rem;
}

.product-info p {
    margin-top: 0.5rem;
    justify-content: center;
    align-items: center;
}

h2 {
    color: rgb(138, 45, 45);
    text-transform: uppercase;
    font-style: italic;
    text-align: left;
    margin-left: 10%;
    margin-right: 8%;
    margin-bottom: -15%;
}

.linea-horizontal {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 1px;
    background-color: #5454546b;
    margin-top: 2%;
}

span {
    font-weight: 400;
    color: rgb(138, 45, 45);
}

@media (max-width: 800px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
        /* Dos columnas */
        gap: 1rem;
        /* Espaciado reducido */
        margin-top: 15%;
    }

    .card {
        padding: 0.8rem;
        height: 85%;
    }

    .product-image {
        height: 60%;
        transform: translate(0, 0);
        /* Sin desplazamiento inicial */
    }

    .card:hover .product-image {
        transform: scale(1.05);
        /* Solo aumenta ligeramente el tamaño */
    }

    .product-info h3 {
        font-size: 15px;
        /* Texto más pequeño */

    }

    .product-info p {
        font-size: 10px;
    }
}
</style>
