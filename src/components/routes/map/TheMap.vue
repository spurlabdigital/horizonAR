<script setup>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { useCmsStore } from '../../../js/cmsStore'

import 'mapbox-gl/dist/mapbox-gl.css'
import PlacesMapboxPlacePanel from '../places/PlacesMapboxPlacePanel.vue'

const cmsStore = useCmsStore()

const activePlace = ref(null)

const places = cmsStore.getPlaces

const locationsGeodata = []

const geojson = {
  type: 'FeatureCollection',
  features: []
}

for (let place of places) {
  locationsGeodata.push(place)

  const feature = {
    type: 'Feature',
    properties: {
      description: place.name,
      icon: 'marker'
    },
    geometry: {
      type: 'Point',
      coordinates: [place.location.lon, place.location.lat]
    }
  }

  geojson.features.push(feature)
}

//Init mapbox
mapboxgl.accessToken = globalSettings.mapbox.token

const bounds = new mapboxgl.LngLatBounds()
for (let location of locationsGeodata) {
  bounds.extend([location.location.lon, location.location.lat])
}

const center = bounds.getCenter()

let map = null
let history = []

//on monted
onMounted(() => {
  map = new mapboxgl.Map({
    container: 'MapPlaces',
    style: globalSettings.mapbox.lightmode,
    center: [13.25, 53.0],
    zoom: 6 // starting zoom
  })
  map.on('load', () => {
    // add markers
    for (const [index, location] of locationsGeodata.entries()) {
      const el = document.createElement('div')
      el.className = ''
      el.innerHTML = ''
      el.style.padding = '1rem'
      el.innerHTML = `<div class="TextMs" />`
      el.addEventListener('click', () => {
        activePlace.value = location
        map.flyTo({
          center: [location.location.lon, location.location.lat],
          zoom: 8,
          speed: 0.75
        })
        // emit('markerClicked', index)
      })

      const longLatID = `${location.location.lon}_${location.location.lat}`

      const sameItemsCount = history.filter((item) => {
        return item === longLatID
      }).length

      el.style.marginLeft = `${sameItemsCount * 1.2}rem`
      history.push(longLatID)

      new mapboxgl.Marker(el)
        .setLngLat([location.location.lon, location.location.lat])
        .addTo(map)
    }
  })

  map.resize()
})

onUnmounted(() => {
  map.remove()
})

function resetActivePlace() {
  activePlace.value = null
}
</script>

<template>
  <div>
    <div id="MapPlaces"></div>
    <PlacesMapboxPlacePanel :content="activePlace" @close="resetActivePlace" />
  </div>
</template>

<style>
#MapPlaces {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}

.TextMs {
  background-color: #ff7700;
  border: 2px solid white;
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  text-align: center;
  color: white;
  font-weight: normal;
  font-size: 1.2rem;
  line-height: 0.9rem;
  padding-top: 0.2rem;
}
</style>
