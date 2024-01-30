<script setup>
const props = defineProps({
  link: String
})
</script>

<template>
  <router-link :to="props.link" class="link">mehr erfahren -></router-link>
</template>

<style scoped>
.link {
  margin-top: 0.5rem;
  border-bottom: 2px solid #ff9c7a;
}
</style>
