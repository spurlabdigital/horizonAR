<script setup>
import { useCmsStore } from '../../../js/cmsStore'
import AListEntry from '../../base/AListEntry.vue'

const cmsStore = useCmsStore()
const places = cmsStore.getPlaces
const sortedPlaces = places.sort((a, b) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }

  return 0
})
</script>

<template>
  <div class="list">
    <AListEntry
      v-for="place in sortedPlaces"
      :key="place.id"
      :name="place.name"
      :link="'place/' + place.id.split('/').pop()"
    >
      {{ place.name }}</AListEntry
    >
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 1rem 1rem 10rem 1rem;
  bottom: 5rem;
  overflow: hidden;
}
</style>
