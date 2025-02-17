<script setup></script>

<template>
    <section>
        <div class="parrafos">
            <article>
                <p>
                    El <span>PLA</span> ofrece buenas prestaciones al combinar una alta velocidad de impresión con
                    unos bordes muy definidos siempre y cuando el material se enfríe correctamente. Además, los modelos que
                    imprime tienen una deformabilidad muy baja. Este tipo de filamento posee una vida útil de al menos 12
                    meses si se conserva entre 15 y 25º grados, por lo que es apto para almacenamiento.
                </p>
                <img src="../assets/filamentos/Pla.png" alt="PLA">
            </article>
            <article>
                <p>
                    El filamento <span>PETG</span> es un copolímero muy famoso en el mundo de la impresión 3D.
                    El PETG nace de la mezcla de pet más glicol lo cual mejora las propiedades del PET.
                    El filamento PETG tiene mayores ventajas que el PET para la impresión 3D, ya que es un material mucho
                    más estable térmicamente.
                </p>
                <img src="../assets/filamentos/Petg.png" alt="PETG">
            </article>
            <article>
                <p>
                    El <span>TPU</span> es un termoplástico elastómero derivado del TPE y de la familia de los poliuretanos.
                    Además, este material lo encontramos en diferentes durezas llamadas Shore, mientras mayor es el Shore,
                    menos flexible es y más fácil se imprime.
                    Este material está muy extendido en el mundo de la industria y se utiliza para muchas aplicaciones tales
                    como manguitos, tapas antideslizantes, etc.
                </p>
                <img src="../assets/filamentos/Tpu.png" alt="TPU">
            </article>
        </div>
    </section>
</template>

<style scoped>
/* Sección principal */
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10%;
    margin-bottom: 10%;
    gap: 2rem;
    text-align: center;
    padding: 0 15%; /* Márgenes laterales más grandes */
}

/* Contenedor de los párrafos con imágenes */
.parrafos {
    display: flex;
    flex-direction: column;
    gap: 5rem; /* Espacio entre los artículos */
    width: 75%; /* Limita el ancho del contenedor */
}

/* Cada artículo (párrafo e imagen) */
article {
    display: flex;
    align-items: center; /* Asegura que texto e imagen estén a la misma altura */
    justify-content: space-between; /* Texto a la izquierda, imagen a la derecha */
    gap: 6rem; /* Espacio entre el texto y la imagen */
    transition: transform 0.3s ease; /* Transición para el escalado */
}

/* Escalado al pasar el mouse sobre el artículo */
article:hover {
    transform: scale(1.05); /* Escala ligeramente el artículo completo */
}

/* Texto del párrafo */
article p {
    flex: 1; /* El párrafo ocupa el espacio restante */
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
    transition: transform 0.3s ease; /* Transición para el texto */
}

/* Imágenes */
article img {
    width: 35%; /* Tamaño más grande para las imágenes */
    max-width: 200px; /* Tamaño máximo */
    height: auto; /* Mantiene las proporciones */
    transition: transform 0.3s ease; /* Transición para el escalado */
}

/* Escalado al pasar el mouse sobre el texto o imagen */
article:hover p,
article:hover img {
    transform: scale(1.1); /* Escala ligeramente el texto e imagen */
}

span{
    font-weight: bold;
}

@media (max-width: 800px) {
    .parrafos{
        margin: 35%;
    }

   .parrafos article{
    display: flex;
    flex-direction: column-reverse;
   }

   .parrafos img{
    width: 70%;
    margin-bottom: -55px;
   }

   .parrafos p{
    font-size: 0.75rem;
   }
}
</style>
