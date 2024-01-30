<script setup>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { onMounted, onUnmounted } from 'vue'

import 'mapbox-gl/dist/mapbox-gl.css'

const emit = defineEmits(['markerClicked'])

//add props
const props = defineProps({
  long: Number,
  lat: Number
})

//Init mapbox
mapboxgl.accessToken = globalSettings.mapbox.token

const center = [props.long, props.lat]

let map = null
let history = []

//on monted
onMounted(() => {
  map = new mapboxgl.Map({
    container: 'MapboxBocPlace', // container ID
    center: center, // starting position [lng, lat]
    style: globalSettings.mapbox.lightmode,
    zoom: 7
  })
  map.on('load', () => {
    // add markers
    const el = document.createElement('div')
    el.className = 'marker'
    // el.innerHTML = 'index + 1'

    const sameItemsCount = history.filter((item) => {
      return item === location.id
    }).length

    el.style.marginLeft = `${sameItemsCount * 2}rem`

    new mapboxgl.Marker(el).setLngLat([props.long, props.lat]).addTo(map)
  })

  map.resize()
})

onUnmounted(() => {
  map.remove()
})
</script>

<template>
  <div id="MapboxBocPlace"></div>
</template>

<style>
#MapboxBocPlace {
  height: 20rem;
  width: 100%;
  margin-bottom: 2rem;
}

.marker {
  background-color: #ff7700;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  color: white;
  font-weight: bold;
  padding-top: 0.2rem;
}
</style>
