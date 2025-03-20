<template>
  <div>
    <h3>BAMBU LAB A1</h3>
    <div class="container">
      <div class="text">
        <h4>CARACTERISTICAS</h4>
        <p>Calibración totalmente automática</p>
        <p>Impresión multicolor (versión combinada)</p>
        <p>Compensación activa del caudal</p>
        <p>Boquilla de cambio rápido de 1 clip</p>
        <p>Cancelación activa del ruido del motor</p>
      </div>
      <div class="img">
        <img src="../assets/img/bambuLabA1.png" />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  background-color: rgb(0, 0, 58);
  display: flex;
  justify-content: center;
  align-items: center;

}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  filter: brightness(65%);
}

.text p{
  color: white;
}

h3 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

img {
  width:50%;
}

@media (max-width: 800px) {

  h3 {
    margin-top: 45%;
    font-size: 70%;
  }
}
</style>
