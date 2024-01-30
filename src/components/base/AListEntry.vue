<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: String,
  link: String
})
</script>

<template>
  <router-link :to="props.link">
    <div class="button">
      <slot></slot>
      <img class="arrow" src="../../assets/icons/arrow.svg" alt="" />
    </div>
  </router-link>
</template>

<style scoped>
.button {
  display: flex;
  padding: 0.75rem;
  justify-content: space-between;

  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 1px solid #ccc;
  width: 100%;
  text-decoration: none;
  color: var(--darkGrey);
}
</style>
