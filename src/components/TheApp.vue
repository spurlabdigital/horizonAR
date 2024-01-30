<script setup>
import { useCmsStore } from '../js/cmsStore'
import TheHeader from './TheHeader.vue'
import TheSidebar from './TheSidebar.vue'
import TheThreejsView from './routes/home/TheThreejs.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import TheHilfeTiles from './routes/hilfe/TheHilfeTiles.vue'

const cmsStore = useCmsStore()
cmsStore.fetchData()
</script>

<template>
  <template v-if="cmsStore.loaded">
    <TheSidebar />
    <TheHeader />
    <router-view />
    <TheThreejsView />
  </template>
</template>

<style scoped></style>
