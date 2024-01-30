<script setup>
import AARMapCard from './AARMapCard.vue'
import { useGlobalState } from '../../../js/store'
import { computed, ref } from 'vue'
import RedPanel from '../../base/ARedPanel.vue'
import PersonPanel from './PersonPanel.vue'
import { useCmsStore } from '../../../js/cmsStore'
import ARFullPersonalPanel from './ARFullPersonalPanel.vue'
import router from '../../../js/router'

const state = useGlobalState()
const cms = useCmsStore()

const activePlace = state.selectedPlaces

const mulitplyObjects = computed(() => {
  return Object.values(activePlace).length > 1
})

const activeSlide = ref(0)

const activePanel = computed(() => {
  let output = []

  for (const placeKey in state.places) {
    const isPlaceInView = state.places[placeKey]
    if (isPlaceInView) {
      output.push(cms.getPlacesByID(placeKey))
    }
  }

  const count = activeSlide.value % output.length
  state.setActivePlace(output[count]?.id)

  return output[count]
})

function doShiftLeft() {
  activeSlide.value--
}

function doShiftRight() {
  activeSlide.value++
}

function doSetPerson(personID) {
  const pureID = personID.split('/').pop()
  router.push({ name: 'horizon-biography', params: { id: pureID } })
}

const activePerson = computed(() => {
  return state.activePerson
})
</script>

<template>
  <div>
    <div v-if="activePanel">
      <AARMapCard
        v-if="!activePerson"
        :key="activePanel.id"
        :content="activePanel"
        :show-selection="mulitplyObjects"
        @shiftLeft="doShiftLeft"
        @shiftRight="doShiftRight"
        @doSetPerson="doSetPerson"
      />
    </div>

    <router-view />
  </div>
</template>

<style scoped></style>
