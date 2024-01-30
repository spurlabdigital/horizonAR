<script setup>
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import ACard from './ASwipeCard.vue'
import AButton from './AButton.vue'
import { useCmsStore } from '../../../js/cmsStore'
// register Swiper custom elements
register()

const cmsStore = useCmsStore()
</script>

<template>
  <div class="TheIntroScreen">
    <div class="Headline">
      <h1>{{ cmsStore.getStartPage.headline }}</h1>
      <h2>{{ cmsStore.getStartPage.subline }}</h2>
    </div>

    <img src="../../../assets/images/Horizon_Startseite.jpg" />

    <div class="textBlock">
      {{ cmsStore.getStartPage.text }}
    </div>

    <swiper-container
      :slides-per-view="1"
      :centered-slides="true"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="block in cmsStore.getStartPage.blocks"
        :key="block.id"
      >
        <ACard :text="block.content.text" />
      </swiper-slide>
    </swiper-container>

    <router-link to="horizon"></router-link>
    <router-link to="/horizon">
      <AButton text="Start" class="buttonPos" />
    </router-link>
  </div>
</template>

<style scoped>
.buttonPos {
  position: fixed;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.TheIntroScreen {
  //overflow-y: scroll;
  //overflow-x: hidden;
  padding-bottom: 10rem;
}

.textBlock {
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 150.023%;
  letter-spacing: 0.075rem;
  padding: 2em;
}

h1 {
  color: #ff6632;
  font-size: 4rem;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.24rem;
  margin: 0.75rem;
}

h2 {
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.25rem;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.11875rem;
  margin: 0.75rem;
}
</style>
