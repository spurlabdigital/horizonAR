<script setup>
const props = defineProps({
  text: String
})
</script>

<template>
  <div class="name">{{ props.text }}</div>
</template>

<style scoped>
.name {
  font-size: 1.625rem;
  font-weight: 800;
  max-width: calc(100% - 4rem);
  line-height: normal;
  letter-spacing: 0.065rem;
}
</style>
