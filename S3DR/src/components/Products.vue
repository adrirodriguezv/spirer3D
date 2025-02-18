<script setup>
</script>
<template>
    <main>
        <section class="container-top">
            <h2>Productos</h2>
            <div class="container">
                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/LlaverA.png" alt="Llavero Nombre">
                    </div>
                    <div class="product-info">
                        <p>Diseño de llavero con nombre</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>

                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/qr.png" alt="Código QR">
                    </div>
                    <div class="product-info">
                        <p>Diseño de código QR, wifi, cartas, datos...</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>

                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/Nfc.png" alt="Llavero NFC">
                    </div>
                    <div class="product-info">
                        <p>Llavero con chip NFC</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>

                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/PalaPadel.png" alt="Llavero pala de pádel">
                    </div>
                    <div class="product-info">
                        <p>Llavero pala de pádel personalizada.</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>

                <div class="card">
                    <div class="product-image">
                        <img src="../assets/img/soporteMando.png">
                    </div>
                    <div class="product-info">
                        <p>Soporte para mandos de consolas PS5, Xbox</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </div>
                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/LlaverA.png" alt="Llavero Nombre">
                    </div>
                    <div class="product-info">
                        <p>Diseño de llavero con nombre</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>
                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/LlaverA.png" alt="Llavero Nombre">
                    </div>
                    <div class="product-info">
                        <p>Diseño de llavero con nombre</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>
                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/LlaverA.png" alt="Llavero Nombre">
                    </div>
                    <div class="product-info">
                        <p>Diseño de llavero con nombre</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>
                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/LlaverA.png" alt="Llavero Nombre">
                    </div>
                    <div class="product-info">
                        <p>Diseño de llavero con nombre</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>
                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/LlaverA.png" alt="Llavero Nombre">
                    </div>
                    <div class="product-info">
                        <p>Diseño de llavero con nombre</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>
                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/LlaverA.png" alt="Llavero Nombre">
                    </div>
                    <div class="product-info">
                        <p>Diseño de llavero con nombre</p>
                        <div class="linea-horizontal"></div>
                    </div>
                </article>
                <article class="card">
                    <div class="product-image">
                        <img src="../assets/img/LlaverA.png" alt="Llavero Nombre">
                    </div>
                    <div class="product-info">
                        <p>Diseño de llavero con nombre</p>
                        <div class="linea-horizontal"></div>
                    </div>
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
    text-align: left;
    margin-left: 10%;
    margin-right: 8%;
    margin-bottom: -15%;
    border-bottom: 1px #5454546b solid;
}
.linea-horizontal{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 1px;
    background-color: #5454546b;
    margin-top: 2%;
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
