<script setup>
import { useCmsStore } from '../../../js/cmsStore'
import AListEntry from '../../base/AListEntry.vue'

const cmsStore = useCmsStore()
const persons = cmsStore.getPersons

const sortedPersons = persons.sort((a, b) => {
  if (a.nachname < b.nachname) {
    return -1
  }
  if (a.nachname > b.nachname) {
    return 1
  }

  return 0
})
</script>

<template>
  <div class="list">
    <AListEntry
      v-for="person in sortedPersons"
      :key="person.id"
      :name="person.name"
      :link="'biography/' + person.id.split('/').pop()"
      >{{ person.nachname + ', ' + person.vorname }}</AListEntry
    >
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 1rem 1rem 10rem 1rem;
  overflow: hidden;
}
</style>
