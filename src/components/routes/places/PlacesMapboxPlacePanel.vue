<script setup>
import AARMapCard from '../ar/AARMapCard.vue'

import { computed } from 'vue'

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

const props = defineProps({
  content: Object
})

const name = computed(() => {
  if (props.content) {
    return props.content.name
  } else {
    return false
  }
})
const link = computed(() => {
  if (props.content) {
    return 'place/' + props.content.id.split('/').pop()
  } else {
    return ''
  }
})
</script>

<template>
  <div class="MiniPanel" v-if="name">
    <div class="closeIcon" @click="close">
      <img src="../../../assets/icons/cross.svg" />
    </div>
    <div class="Name">{{ name }}</div>
    <router-link :to="link"><div>mehr erfahren</div></router-link>
  </div>
</template>

<style scoped>
.closeIcon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  opacity: 0.5;
}
.MiniPanel {
  padding-top: 1rem;
  position: absolute;
  padding-right: 1rem;
  bottom: 2rem;
  margin: 3%;
  padding-bottom: 1rem;
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
  align-content: center;
  align-items: center;
  color: #494949;
}

.Name {
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
}

.MiniPanel a {
  border-bottom: 2px solid #ff9c7a;
}
</style>
