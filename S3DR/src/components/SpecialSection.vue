<script setup></script>

<template>
    <section>
        <div class="image-grid">
            <h1>Hola</h1>
            <div class="image-left">
                <img src="../assets/img/copa.png">
                <div>
                    <h2>Trofeos</h2>
                    <p>Personaliza tu copa deportiva</p>
                    <RouterLink :to="`/personalizar`"><button>Personalizar</button></RouterLink>
                </div>
            </div>

            <div class="image-right">
                <img src="../assets/img/abrazadera.png">
                <div>
                    <h2>Pieza o accesorio</h2>
                    <p>Diseña tu pieza a medida</p>
                    <RouterLink :to="`/personalizar`"><button>Personalizar</button></RouterLink>
                </div>
            </div>
        </div>
        <p></p>
    </section>
</template>

<style scoped>
section {
    margin-top: 5.5%;
    text-align: center;
    margin-bottom: 10%;
}

h2 {
    margin-bottom: 5%;
}

.image-grid {
    margin-left: 15%;
    margin-right: 15%;
    display: grid;
    grid-template-columns: repeat(1, 1fr); /* Solo una columna por defecto */
}

.image-left,
.image-right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8rem;
}

.image-left {
    flex-direction: row; /* Imagen a la izquierda */
}

.image-right {
    flex-direction: row-reverse; /* Imagen a la derecha */
}

img {
    width: 40%;
    object-fit: cover;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

img:hover {
    transform: scale(1.1);
}

p {
    margin-top: 5%;
}

button{
    margin-top: 5%;
    background-color: transparent;
    border: 1px #545454 solid;
    border-radius: 35px;
    padding: 3.5%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

button:hover{
    transform: scale(1.1);
}

@media (max-width: 800px) {
    section {
        margin: 30%;
        margin-bottom: 30%;
    }

    h2 {
        font-size: 95%;
        margin-bottom: 15%;
    }

    p {
        font-size: 55%;
    }

    img{
        width: 200%;
    }

    .image-grid {
        margin-left: 5%;
        margin-right: 5%;
    }

    .image-left,
    .image-right {
        flex-direction: column; /* Cambia a columna en dispositivos pequeños */
    }
}
</style>
