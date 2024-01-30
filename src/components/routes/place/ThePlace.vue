<script setup>
import { useGlobalState } from '../../../js/store'
import { computed, onBeforeMount, ref } from 'vue'
import blocks_image from '../../blocks/image.vue'
import blocks_text from '../../blocks/text.vue'
import blocks_quelle from '../../blocks/quelle.vue'
import AHeader from '../../base/ATextPanelHeader.vue'
import { calcDistance, getGPSPosition } from '../../../threejs/vvv/geoHelper'
import { useRoute } from 'vue-router'
import { useCmsStore } from '../../../js/cmsStore'
import MapboxBoxPlace from './ThePlaceMapbox.vue'
import ALinkPersonButtons from '../ar/ALinkPersonButtons.vue'

const components = {
  image: blocks_image,
  text: blocks_text,
  quelle: blocks_quelle
}

const cmsStore = useCmsStore()
const route = useRoute()

onBeforeMount(() => {
  if (route.params.id) {
    const person = cmsStore.getPlaces.find((place) => {
      const cleandId = place.id.split('/').pop()
      return cleandId === route.params.id
    })
    globalState.setActivePlace(person)
  }
})

const showDistance = ref(false)

getGPSPosition().then((pos) => {
  const posBuffer = pos
  // console.log(posBuffer)
  if (posBuffer) {
    globalStore.gps = {
      latitude: posBuffer.latitude,
      longitude: posBuffer.longitude
    }
    // globalStore.gps.latitude = posBuffer.latitude
    // globalStore.gps.longitude = posBuffer.longitude
    showDistance.value = true
  }
})

const globalState = useGlobalState()
const place = computed(() => globalState.activePlace)

const globalStore = useGlobalState()

const distance = computed(() => {
  const distance = calcDistance(
    place.value.location.lat,
    place.value.location.lon,
    globalStore.gps.latitude,
    globalStore.gps.longitude
  )
  if (showDistance.value) {
    return distance.toFixed(2) + ' km entfernt'
  } else {
    return ''
  }
})
const arLink = computed(() => {
  return {
    name: 'horizon-place',
    params: { id: place.value.id.split('/').pop() }
  }
})
</script>

<template>
  <div v-if="place" class="PersonPanel" ref="panel">
    <AHeader :subline="distance" :headline="place.name" :link="arLink" />

    <div class="linkedPersons">Verknüpfte Personen</div>
    <ALinkPersonButtons :placeID="place.id.split('/').pop()" />

    <component
      v-for="block in place.blocks"
      :is="components[block.type]"
      :key="block.id"
      :content="block"
    />
    <MapboxBoxPlace :lat="place.location.lat" :long="place.location.lon" />

    <div class="addSpace" />
  </div>
</template>

<style scoped>
.PersonPanel {
  padding: 0;
  background: #fff7f4;
}
.linkedPersons {
  padding: 0.5rem 1rem;
}
</style>

<!--Anpassung der Liste nicht schick aber möglich-->
<style>
.listPersons a {
  background: #ffffff !important;
  padding: 1rem;
}
.listPersons {
  padding: 0rem 1rem 1rem 1rem !important;
}
</style>
