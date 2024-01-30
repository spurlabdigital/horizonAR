<script setup>
import { computed } from 'vue'
import { useGlobalState } from '../../../js/store'
import TheThreejsCanvas from './TheThreejsCanvas.vue'
import ARBlocker from './ARBlocker.vue'

const globalState = useGlobalState()

const isTrusted = computed(() => {
  return globalState.isTrusted
})
</script>

<template>
  <ARBlocker />
  <TheThreejsCanvas v-if="isTrusted" />
</template>

<style scoped></style>
