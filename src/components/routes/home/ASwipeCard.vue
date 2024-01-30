<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  text: String
})
</script>

<template>
  <div class="Card">
    <span v-html="props.text"></span>
  </div>
</template>

<style scoped>
.Card {
  border-radius: 0.625rem;
  background: rgba(217, 217, 217, 0.5);
  padding: 2rem 2rem;
  margin: 2rem;

  color: rgba(0, 0, 0, 0.85);
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 140.023%;
  letter-spacing: 0.0525rem;
}
</style>
