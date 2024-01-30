<script setup>
import { ref } from 'vue'
import { calcDistance } from '../../../threejs/vvv/geoHelper'
import { useGlobalState } from '../../../js/store'

const props = defineProps({
  content: Object,
  showSelection: Boolean
})

const getPersons = ref(props.content?.persons?.slice(0, 3)).value
const showList = ref(false)
function toggleList() {
  showList.value = !showList.value
}

const emit = defineEmits(['shiftLeft', 'shiftRight', 'doSetPerson'])

function doShiftLeft() {
  emit('shiftLeft')
}

function doShiftRight() {
  emit('shiftRight')
}

function doSetPerson(personID) {
  emit('doSetPerson', personID)
}

const globalStore = useGlobalState()
function getDistance(props) {
  const location = props.content.location
  const distance = calcDistance(
    location.lat,
    location.lon,
    globalStore.gps.latitude,
    globalStore.gps.longitude
  )
  return distance.toFixed(2)
}
</script>

<template>
  <div class="AARMapCard">
    <img class="cross" src="../../../assets/icons/cross.svg" alt="" />

    <div class="name">{{ props.content.name }}</div>
    <router-link
      :to="{
        name: 'place',
        params: { id: props.content.id.split('/').pop() }
      }"
      class="link"
      >mehr erfahren</router-link
    >

    <div
      class="personenListe"
      v-if="getPersons"
      :class="{ showList: showList }"
    >
      <div class="headBar" @click="toggleList">
        <div class="linkedPersons">Verknüpfte Personen</div>
        <div class="arrow">
          <img src="../../../assets/icons/arrow.svg" />
        </div>
      </div>
      <div class="listPersons">
        <div
          class="personButton"
          v-for="person in getPersons"
          :key="person.id"
          @click="doSetPerson(person.id)"
        >
          {{ person.name }}
        </div>
      </div>
    </div>

    <div class="navButtons">
      <div class="navButton pre" @click="doShiftLeft">
        <img src="../../../assets/icons/arrow.svg" alt="pre" />
      </div>
      <div class="navButton" @click="doShiftRight">
        <img src="../../../assets/icons/arrow.svg" alt="pre" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.AARMapCard {
  position: absolute;
  bottom: 1rem;
  margin: 5%;
  padding: 1.3rem;

  width: 90%;
  height: fit-content;
  border-radius: 0.9375rem;
  background: linear-gradient(
      0deg,
      rgba(255, 102, 50, 0.1) 0%,
      rgba(255, 102, 50, 0.1) 100%
    ),
    rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8.640000343322754px);
  display: flex;
  flex-direction: column;
  align-items: start;
  color: #494949;
}

.link {
  text-decoration: underline;
}

.distance {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.0525rem;
}

.name {
  margin-bottom: 0.5rem;
  font-size: 1.625rem;
  font-weight: 800;
  width: 90%;
  line-height: normal;
  letter-spacing: 0.065rem;
}

.cross {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ffcab8;
  padding: 0.75rem;
  border-radius: 50%;
}

.personenListe {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 0.625rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  line-height: normal;
  letter-spacing: 0.0525rem;
  position: relative;
  max-height: 2.5rem;
  overflow: hidden;
  transition: all 500ms ease-in-out;
}
.showList {
  max-height: 10rem;
  overflow-y: scroll;
  transition: all 500ms ease-in-out;
}
.arrow {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  rotate: 90deg;
  opacity: 0.5;
  transition: all 250ms ease-in-out;
}
.showList .arrow {
  rotate: 270deg;
  transition: all 250ms ease-in-out;
}
.linkedPersons {
  padding: 0.5rem;
}

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

.headBar {
  width: 100%;
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

.navButtons {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
}

.navButtons div {
  height: 2rem;
  flex-grow: 1;
  background: #ffcab8;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4375rem;
}

.navButtons div {
  opacity: 0.3;
  background: #ffffff;
}

.pre {
  transform: rotate(180deg);
}
</style>
