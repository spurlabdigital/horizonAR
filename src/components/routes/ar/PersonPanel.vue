<script setup>
import { useGlobalState } from '../../../js/store'
import { useCmsStore } from '../../../js/cmsStore'
import { computed, ref } from 'vue'

const cmsStore = useCmsStore()
const state = useGlobalState()

const activePerson = computed(() => {
  return cmsStore.getPersonByID(state.activePerson)
})

const showList = ref(false)

function toggleList() {
  showList.value = !showList.value
}
const closePanel = () => {
  state.activePerson = null
}

let history = {}
function getChar(station, index) {
  if (history[station.name]) {
    return history[station.name]
  } else {
    history[station.name] = String.fromCharCode(65 + index)
    return history[station.name]
  }
}
</script>

<template>
  <div class="PersonPanel">
    <div class="backButton" @click="closePanel">
      <img src="../../../assets/icons/cross.svg" alt="arrow" />
    </div>
    <div class="arButton"></div>
    <!--    <div class="personLifeDate">10</div>-->
    <div class="personName headline">{{ activePerson.name }}</div>
    <router-link
      :to="{
        name: 'person',
        params: { id: activePerson.id.split('/').pop() }
      }"
      class="personDescription"
      >mehr Erfahren</router-link
    >

    <div class="container" :class="{ showList: showList }">
      <div @click="toggleList">
        <div class="linkedPersons">Biografische Stationen</div>
        <div class="arrow">
          <img src="../../../assets/icons/arrow.svg" />
        </div>
      </div>
      <div class="stations">
        <div class="line"></div>
        <div
          class="station"
          v-for="(station, index) in activePerson.stations"
          :key="station.name"
        >
          <div class="icon">{{ getChar(station, index) }}</div>
          <router-link
            :to="{
              name: 'place',
              params: { id: station.location.split('/').pop() }
            }"
            class="stationName"
            >{{ station.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.PersonPanel {
  padding: 1rem;
  text-align: start;
  width: 100%;
}

.backButton {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 102, 50, 0.5);
  border-radius: 50%;
}

.personLifeDate {
  opacity: 0.75;
}

.personName {
  margin-top: 0.2rem;
}

.personDescription {
  margin-top: 0.5rem;
  text-decoration: underline;
}

.arrow {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  rotate: 90deg;
  opacity: 0.5;
  transition: all 500ms ease-in-out;
}
.showList .arrow {
  rotate: 270deg;
  transition: all 500ms ease-in-out;
}

.icon {
  background: #ff6632;
  color: white;
  border-radius: 50%;
  min-width: 1.7rem;
  min-height: 1.7rem;
  max-width: 1.7rem;
  max-height: 1.7rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  font-size: 0.9rem;
}
.container {
  max-height: 2.5rem;
  overflow: hidden;
  position: relative;
  transition: all 500ms ease-in-out;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.showList {
  max-height: 20rem;
  overflow-y: scroll;
  transition: all 500ms ease-in-out;
}
.station {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.stations > * + * {
  margin-top: 0.5rem;
}

.stations {
  position: relative;
  z-index: 2;
  font-weight: bold;
  text-align: left;
  width: 100%;
}

.stationName {
  display: inline-block;
  margin-left: 1rem;
}

.line {
  height: 100%;
  background: #ff6632;
  position: absolute;
  top: 0;
  left: 0.75rem;
  width: 0.15rem;
}
</style>
