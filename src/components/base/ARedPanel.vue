<script setup>
import crossSVG from '../../assets/icons/cross.svg?raw'

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<template>
  <div class="RedPanel">
    <div @click="close" class="closeIcon" v-html="crossSVG" />
    <slot></slot>
  </div>
</template>

<style scoped>
.RedPanel {
  min-height: 7rem;
  position: absolute;
  bottom: 0;
  margin: 3%;
  padding: 1rem;
  width: 94%;
  height: fit-content;
  max-height: 75%;
  border-radius: 0.9375rem;
  background: linear-gradient(
      0deg,
      rgba(255, 102, 50, 0.1) 0%,
      rgba(255, 102, 50, 0.1) 100%
    ),
    rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8.640000343322754px);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #494949;
  z-index: 50;
}

.closeIcon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 102, 50, 0.5);
  border-radius: 50%;
}
</style>
