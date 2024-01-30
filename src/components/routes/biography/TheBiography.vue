<script setup>
import { useGlobalState } from '../../../js/store'

import { computed, onBeforeMount, onMounted, ref } from 'vue'
import blocks_image from '../../blocks/image.vue'
import blocks_text from '../../blocks/text.vue'
import blocks_quelle from '../../blocks/quelle.vue'
import MapboxBoxPerson from './TheBiographyMapbox.vue'

import { useRouter, useRoute } from 'vue-router'
import { useCmsStore } from '../../../js/cmsStore'
import AHeader from '../../base/ATextPanelHeader.vue'

const cmsStore = useCmsStore()
const route = useRoute()

onBeforeMount(() => {
  if (route.params.id) {
    const person = cmsStore.getPersons.find((person) => {
      const cleandId = person.id.split('/').pop()
      return cleandId === route.params.id
    })
    globalState.setActivePerson(person)
  }
})

const components = {
  image: blocks_image,
  text: blocks_text,
  quelle: blocks_quelle
}

const globalState = useGlobalState()
const person = computed(() => globalState.activePerson)

const blocks = ref(null)
const panel = ref(null)

function log(event) {
  const block = blocks.value[event]
  const distance = block.getBoundingClientRect().top
  window.scroll({
    top: distance - 150,
    behavior: 'smooth'
  })
}

const arLink = computed(() => {
  return {
    name: 'horizon-biography',
    params: { id: person.value.id.split('/').pop() }
  }
})

const geburtsName = computed(() => {
  if (person.value.geburtsName) {
    return 'geb. ' + person.value.geburtsName
  } else {
    return ''
  }
})
</script>

<template>
  <div v-if="person" class="PersonPanel" ref="panel">
    <a-header
      :subline="geburtsName + '\n' + person.time"
      :headline="person.vorname + ' ' + person.nachname"
      :link="arLink"
    />

    <MapboxBoxPerson @markerClicked="log" />

    <ul>
      <li v-for="(station, index) in person.stations" :key="station.id">
        <div class="stationHeader">
          <div class="stationIndex">{{ index + 1 }}</div>
          <router-link
            :to="{
              name: 'place',
              params: { id: station.location.split('/').pop() }
            }"
            class="stationName"
          >
            {{ station.name }}

            <svg
              width="20"
              height="12"
              viewBox="0 0 11 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M2 16L9 9L2 2"
                stroke="#FF6632"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
        </div>
        <div class="blocks" ref="blocks">
          <component
            v-for="block in station.blocks"
            :is="components[block.type]"
            :key="block.id"
            :content="block"
          />
        </div>
      </li>
    </ul>
    <div class="addSpace" />
  </div>
</template>

<style scoped>
.PersonPanel {
  padding: 0;
  background: #fff7f4;
  overflow-y: scroll;
  overflow-x: hidden;
}

.stationHeader {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
  margin-top: 5rem;
}

.stationIndex {
  border-radius: 50%;
  border: 2px solid var(--white);
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
  min-height: 1.5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  color: var(--white);
  background: var(--orange);
  font-weight: 900;
  font-size: 0.8rem;
}

.stationName {
  margin-left: 1rem;
  font-weight: 900;
  font-size: 1rem;
  text-decoration: underline var(--orange);
  color: var(--darkGrey);
}
</style>
