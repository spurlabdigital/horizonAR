<script setup>
import { computed, defineProps } from 'vue'
import { useCmsStore } from '../../../js/cmsStore'

const props = defineProps({
  placeID: String,
  link: {
    type: String,
    default: 'person'
  }
})

const cmsStore = useCmsStore()
const persons = computed(() => {
  return cmsStore.getPlacesBySubID(props.placeID).persons
})
</script>

<template>
  <div class="listPersons">
    <router-link
      :to="{ name: link, params: { id: person.id.split('/').pop() } }"
      class="personButton"
      v-for="person in persons"
      :key="person.id"
    >
      {{ person.vorname + ' ' + person.nachname }}
    </router-link>
  </div>
</template>

<style scoped>
.listPersons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
  position: relative;
}

.personButton {
  border-radius: 0.4375rem;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.5rem;
  color: rgba(0, 0, 0, 0.75);
  text-align: center;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.06rem;
}
</style>
