<script setup>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { onMounted, onUnmounted } from 'vue'
import { useGlobalState } from '../../../js/store'
import { useCmsStore } from '../../../js/cmsStore'

import 'mapbox-gl/dist/mapbox-gl.css'

const globalState = useGlobalState()
const cmsStore = useCmsStore()
const activePerson = globalState.activePerson

const emit = defineEmits(['markerClicked'])

const locationsGeodata = []
for (let station of activePerson.stations) {
  if (!station.location) continue

  const geoData = cmsStore.getPlacesByID(station.location)

  const hasDoublicalte = locationsGeodata.find((location) => {
    return location.id === geoData.id
  })

  // console.log(hasDoublicalte)

  let shift = hasDoublicalte ? 0.05 : 0

  const copy = {
    id: geoData.id,
    location: {
      lat: geoData.location.lat,
      lon: geoData.location.lon + shift
    }
  }

  locationsGeodata.push(copy)
}

//create Mapbox line
const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: locationsGeodata.map((location) => {
          return [location.location.lon, location.location.lat]
        })
      }
    }
  ]
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
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    center: center, // starting position [lng, lat]
    style: globalSettings.mapbox.lightmode, // style URL
    zoom: 2,
    bounds: bounds,
    animation: true,
    fitBoundsOptions: { padding: { top: 25, bottom: 25, left: 25, right: 25 } }
  })
  map.on('load', () => {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#ff7700',
        'line-width': 4
      }
    })

    // add markers
    for (const [index, location] of locationsGeodata.entries()) {
      const el = document.createElement('div')
      el.className = 'marker'
      el.innerHTML = index + 1
      el.addEventListener('click', () => {
        emit('markerClicked', index)
      })

      history.push(location.id)

      new mapboxgl.Marker(el)
        .setLngLat([location.location.lon, location.location.lat])
        .addTo(map)

      //count history objects with location.id
    }
  })

  map.resize()
})

onUnmounted(() => {
  map.remove()
})
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  height: 20rem;
  width: 100%;
  margin-bottom: 2rem;
}

.marker {
  background-color: #ff7700;
  border: 2px solid white;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  color: white;
  font-family: Inter, sans-serif;
  font-weight: 900;
  font-size: 0.7rem;
  padding-top: 0rem;
}
</style>
