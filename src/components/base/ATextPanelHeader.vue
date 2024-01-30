<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'aHeader',
  props: {
    headline: {
      type: String,
      required: true
    },
    subline: {
      type: String
    },
    link: {
      type: Object
    }
  }
})
</script>

<template>
  <div class="Header">
    <RouterLink :to="link" class="CameraIcon">
      <img src="../../assets/icons/ar.svg" alt="camera" />
    </RouterLink>
    <div class="Headline">{{ headline }}</div>
    <div class="Subline">{{ subline }}</div>
  </div>
</template>

<style scoped>
.Header {
  padding: 1rem;
  min-height: 8rem;
  position: relative;
  top: 0;
  background: #fff7f4;
  z-index: 10;
}
.CameraIcon {
  position: fixed;
  z-index: 1;
  pointer-events: all;
  width: 4rem;
  right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
}

.Headline {
  color: var(--middleGrey);
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  max-width: calc(100% - 4rem);
  letter-spacing: 0.065rem;
}
.Subline {
  font-size: 1.2rem;
  opacity: 0.3;
  margin-top: 0.5rem;
}
</style>
