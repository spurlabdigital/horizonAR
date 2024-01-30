<script setup>
import AARMapCard from './AARMapCard.vue'
import TheThreejsView from '../home/TheThreejs.vue'
import ARUi from './ARUi.vue'
import { register } from 'swiper/element/bundle'
</script>

<template>
  <div class="ARMode">
    <ARUi class="interactive" />
  </div>
</template>

<style scoped>
.ARMode {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2;
}
.interactive {
  pointer-events: all;
}
</style>
