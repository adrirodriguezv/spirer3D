<template>
  <div class="image-container">
    <h3>BAMBU LAB A1</h3>
    <div class="text-overlay">
      <h3></h3>
    </div>
    <div class="text-container">
      <img src="../assets/img/CTA.jpg" alt="Imagen de fondo" />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.image-container {
  position: relative;
  height: 600px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  filter: brightness(65%);
}

h3 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 55px;
  text-align: center;
}

@media (max-width: 800px) {

  h3 {
    margin-top: 45%;
    font-size: 70%;
  }
}
</style>
