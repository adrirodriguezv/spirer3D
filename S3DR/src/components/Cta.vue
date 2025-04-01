<template>
  <div class="container">
    <h3>BAMBU LAB A1: <span class="intro">Nuestra impresora</span></h3>
    <div class="container-cta">
      <div class="text">
        <h4>CARACTERISTICAS</h4>
        <div class="caracteristicas">
          <p>Calibración totalmente automática</p>
          <p>Impresión multicolor (versión combinada)</p>
          <p>Compensación activa del caudal</p>
          <p>Boquilla de cambio rápido de 1 clip</p>
          <p>Cancelación activa del ruido del motor</p>
        </div>
      </div>
      <div class="container-img">
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
  background-color: rgb(172, 11, 11);
  padding-bottom: 5%;
}

.container-cta {
  display: flex;
  justify-content: center;
  align-items: center;

}

.intro{
  text-align: center;
  color: white;
  font-weight: 100;
  font-size: 60%;
  margin-top: -2%;
  font-style: italic;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  filter: brightness(65%);
}

.text p {
  width: 150%;
  color: white;
  font-size: 140%;
  line-height: 155%;
  transition: 0.4s ease-in;
  font-weight: 200;
}

.text p:hover{
  transform: scale(1.1);
}

h3 {
  font-size: 190%;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding-top: 5%;
  margin-bottom: 2%;
}

.text {
  margin-left: 15%;
}

.container-img {
  margin-left: 25%;
}

img {
  width: 60%;
}

@media (max-width: 800px) {

  h3 {
    margin-top: 45%;
    font-size: 70%;
  }
}
</style>
