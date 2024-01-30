<script setup>
import { register } from 'swiper/element/bundle'
import { onMounted, ref } from 'vue'

register()

const buttonText = ref('überspringen')

onMounted(() => {
  const swiper = document.querySelector('.swiper-container').swiper
  swiper.on('reachEnd', () => {
    console.log('slide changed')
    buttonText.value = 'abschließen'
  })
})
</script>

<template>
  <div class="helpScreen">
    <swiper-container
      class="swiper-container"
      :slides-per-view="1"
      :centered-slides="true"
      :pagination="{ clickable: true }"
    >
      <swiper-slide>
        <img src="../../../assets/images/HorizonIntro01.svg" />
      </swiper-slide>

      <swiper-slide>
        <img src="../../../assets/images/HorizonIntro02.svg" />
      </swiper-slide>

      <swiper-slide>
        <img src="../../../assets/images/HorizonIntro03.svg" />
      </swiper-slide>

      <swiper-slide>
        <img src="../../../assets/images/HorizonIntro04.svg" />
      </swiper-slide>

      <swiper-slide>
        <img src="../../../assets/images/HorizonIntro05.svg" />
      </swiper-slide>

      <swiper-slide>
        <img src="../../../assets/images/HorizonIntro06.svg" />
      </swiper-slide>

      <swiper-slide>
        <img src="../../../assets/images/HorizonIntro07.svg" />
      </swiper-slide>

      <swiper-slide>
        <img src="../../../assets/images/HorizonIntro08.svg" />
      </swiper-slide>
    </swiper-container>

    <router-link class="next" to="/horizon">{{ buttonText }}</router-link>
  </div>
</template>

<style scoped>
.helpScreen {
  background: #e1d1cc;
  width: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: hidden;

  top: 0;
  left: 0;
  height: 100vh;

  padding-top: 4rem;
}

.swiper-container {
  max-height: calc(90vh - 4rem);
}
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  //background: green;
}

.next {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 1.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  color: #4b4b4b;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.0675rem;
  text-decoration-line: underline;
  z-index: 1000;
}


</style>
<style>
.sample-slider .swiper-pagination-bullets {
  bottom: initial;
  top: 10px;
}


</style>
