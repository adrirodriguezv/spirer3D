<script setup>
</script>

<template>
  <footer>
    <div class="footer-container">

      <!-- Información de contacto -->
      <div class="footer-section">
        <p>Calle Falsa 123, Ciudad, País</p>
        <p>+34 123 456 789</p>
      </div>

      <div class="">
        <RouterLink :to="`/`"><img class="logo" src="/Logo3D.png"></RouterLink>
      </div>

      <div>
        <!-- Métodos de pago -->
        <div class="footer-section">
          <p class="text-footer">Métodos de Pago</p>
          <ul class="payment-methods">
            <li><img src="../assets/img/bizum.png" /></li>
            <li><img src="../assets/img/paypal.png" /></li>
            <li><img src="../assets/img/googlePay.png" /></li>
            <li><img src="../assets/img/applePay.png" /></li>
          </ul>
        </div>
      </div>
       <!-- Redes sociales -->
       <div class="footer-section">
          <ul class="social-links">
            <li><a href="#"><img src="../assets/img/whatsapp.png" /></a></li>
            <li><a href="#"><img src="../assets/img/instagram.png" /></a></li>
            <li><a href="#"><img src="../assets/img/tiktok.png" /></a></li>
            <li><a href="#"><img src="../assets/img/x.png" /></a></li>
          </ul>
        </div>
    </div>

    <div class="legals">
      <p>&copy; SpireR 2025</p>
      <p>|</p>
      <RouterLink :to="`/contact`">
        <p>Contacto</p>
      </RouterLink>
      <p>Aviso legal</p>
      <p>Política de privacidad</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: rgb(29, 29, 29);
  padding: 20px 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  flex-wrap: wrap; /* Asegura que todo se ajuste en pantallas pequeñas */
}

.footer-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center; /* Alinea verticalmente */
  margin-top: 8%;
}

.footer-section {
  margin: 5%;
  text-align: center;
}

.social-links,
.payment-methods {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Espacio entre los íconos */
  list-style: none;
  padding: 0;
  margin: 0;
}

.text-footer {
  font-size: 0.5em;
  margin-bottom: 10px; /* Espacio entre el texto y las imágenes */
  text-transform: uppercase;
  font-weight: 600;
}

.social-links img {
  width: 25px; /* Tamaño de las imágenes de redes sociales */
}

.payment-methods img {
  width: 50px; /* Tamaño de las imágenes de los métodos de pago */
}

.logo {
  width: 100%; /* Tamaño del logo */
  max-width: 120px;
}

p {
  color: white;
}

.legals {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 80%;
  display: flex;
  justify-content: center;
  gap: 2rem; /* Espacio entre los enlaces legales */
}

a {
  text-decoration: none;
}

@media (max-width: 800px) {
  footer {
    padding: 10%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .logo {
    width: 70%; /* Aumenta el tamaño del logo en pantallas pequeñas */
  }

  .social-links,
  .payment-methods {
    flex-direction: row; /* Los coloca en fila en pantallas pequeñas */
    gap: 15px; /* Espacio entre los íconos en pantallas pequeñas */
  }

  .legals {
    flex-direction: column;
    gap: 1rem; /* Ajusta el espacio entre los enlaces legales en pantallas pequeñas */
  }
}
</style>