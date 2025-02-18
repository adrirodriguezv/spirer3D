<script setup>
import Cta from '@/components/Cta.vue'
import ImageArticle from '@/components/ImageArticle.vue';
import Navegador from '@/components/Navegador.vue';
import SpecialSection from '@/components/SpecialSection.vue';
import Video from '@/components/VideoBanner.vue';
</script>

<template>
  <body>
    <main>
      <Navegador/>
      <Video></Video>
      <SpecialSection></SpecialSection>
      <Cta></Cta>
      <ImageArticle></ImageArticle>
    </main>
  </body>
</template>

<style scoped>


h2 {
  font-size: 300%;
  text-align: center;
  margin-top: 13%;
}

p {
  text-align: center;
  width: 70%;
  margin: 0 auto;
  font-size: 110%;
  margin-top: 1.5%;
}

span {
  font-weight: bold;
  font-style: italic;
}

@media (max-width: 800px) {
 
  h2 {
    font-size: 150%;
  }

  p {
    font-size: 65%;
  }

}
</style>
