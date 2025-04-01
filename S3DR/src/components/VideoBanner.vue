<template>
    <section class="video-container">
      <div class="content">
        <h2>SRV 3D</h2>
        <p>
          Crea una amplia variedad de objetos personalizados como logos, medallas, copas, piezas de repuesto, muñecos,
          accesorios y llaveros. La versatilidad de la tecnología permite fabricar desde pequeños detalles hasta piezas
          más grandes, adaptadas a tus necesidades y gustos.
        </p>
        <RouterLink :to="`/personalizar`"><button>Empezar personalización</button></RouterLink>
      </div>
      <!--<video ref="video" src="../assets/video/clipBambuLab.mp4" autoplay loop muted></video>-->
    </section>
  </template>
  
  <script setup>
  // No es necesario agregar nada más en el script
  </script>
  
  <style scoped>
  /* Asegúrate de que el contenedor esté centrado */
  .video-container {
    display: flex;
    justify-content: center; /* Centrado horizontal */
    align-items: center; /* Centrado vertical */
    height: 100vh; /* Ocupa toda la altura de la pantalla */
    position: relative; /* Asegura que los elementos se posicionen correctamente dentro */
    margin: 0; /* Elimina márgenes */
    padding: 0; /* Elimina padding */
  }
  
  /* Contenido sobre el video */
  .content {
    position: absolute; /* Posiciona el contenido sobre el video */
    z-index: 1; /* Asegura que el contenido esté por encima del video */
    text-align: left; /* Centra el texto */
    padding: 20px; /* Añade un poco de padding para que el texto no quede pegado al borde */
    width: 100%;
    max-width: 75%; /* Establece un máximo para que el texto no ocupe toda la pantalla */
    margin-top: 10%;
  }
  
  /* Título */
  .content h2 {
    font-size: 800%; /* Ajusta el tamaño del título */
    margin: 0 0 20px 0; /* Margen debajo del título */
    color: white;
    display: flex;
    justify-content: left;
  }
  
  /* Párrafo */
  .content p {
    font-size: 1.2rem; /* Ajusta el tamaño del texto */
    line-height: 1.6; /* Espacio entre líneas */
    margin: 0; /* Elimina márgenes */
    padding: 0; /* Elimina padding */
    color: white;
  }
    
  /* Video */
  video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Asegura que el video cubra todo el espacio disponible */
    position: absolute; /* Posiciona el video en el fondo */
    top: 0; /* Asegura que esté alineado en la parte superior */
    left: 0; /* Asegura que esté alineado en la parte izquierda */
    filter: brightness(60%);
  }

  button{
    margin-top: 2.5%;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 35px;
    padding: 1%;
    color: white;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  button:hover{
    transform: scale(1.1);

  }

  @media (max-width: 800px){
    .content h2{
        font-size: 3em;
    }

    .content p{
        font-size: 0.75em;
    }

    button{
        margin-top: 1rem;
        padding: 5%;
    }
  }
  </style>
  