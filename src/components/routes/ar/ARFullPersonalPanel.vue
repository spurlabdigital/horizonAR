<script setup>
import { useCmsStore } from '../../../js/cmsStore'
import { useGlobalState } from '../../../js/store'
import { computed } from 'vue'
import blocks_image from '../../blocks/image.vue'
import blocks_text from '../../blocks/text.vue'

const components = {
  image: blocks_image,
  text: blocks_text
}
const cmsStore = useCmsStore()
const state = useGlobalState()
const activePerson = computed(() => {
  return cmsStore.getPersonByID(state.activePerson)
})
</script>

<template>
  <div class="FullPersonPanel">
    <div class="backButton">
      <img src="../../../assets/icons/cross.svg" alt="arrow" />
    </div>
    <div class="arButton"></div>
    <div class="personName headline">{{ activePerson.name }}</div>
    <div class="personLifeDate">10</div>

    <!--    <div class="AllgemeineInfo">-->
    <!--      <div v-for="element in activePerson.blocks" :key="element.id">-->
    <!--        <component :is="components[element.type]" :content="element" />-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="AllgemeineInfo">-->
    <!--      {{ activePerson.stations }}-->
    <!--    </div>-->

    <div class="AllgemeineInfo">
      <div v-for="(station, index) in activePerson.stations" :key="station.id">
        <div v-for="block in station.blocks" :key="block.id">
          <div class="stationNumber">{{ index + 1 }}</div>
          <div class="stationName">{{ station.name }}</div>
          <component :is="components[block.type]" :content="block" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.FullPersonPanel {
  height: 100%;
  max-height: 75%;
  overflow-y: scroll;
}
.AllgemeineInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.PersonPanel {
  padding: 4rem 2rem 0rem 2rem;
  text-align: center;
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

.icon {
  border: 2px solid #ff6632;
  color: #ff6632;
  border-radius: 50%;
  min-width: 2rem;
  min-height: 2rem;
  max-width: 2rem;
  max-height: 2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: white;
  z-index: 1;
}

.station {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.stations > * + * {
  margin-top: 1rem;
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
  left: 0.9rem;
  width: 0.2rem;
}
</style>
