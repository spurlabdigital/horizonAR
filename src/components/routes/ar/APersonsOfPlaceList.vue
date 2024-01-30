<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import arrowIcon from '../../../assets/icons/arrow.svg'
import { useCmsStore } from '../../../js/cmsStore'

const props = defineProps({
  placeID: String
})

const cmsStore = useCmsStore()
const persons = cmsStore.getPlacesBySubID(props.placeID).persons

const showList = ref(false)
function toggleList() {
  showList.value = !showList.value
}
</script>

<template>
  <div class="personenListe" v-if="true" :class="{ showList: showList }">
    <div class="headBar" @click="toggleList">
      <div class="linkedPersons">Verknüpfte Personen</div>
      <div class="arrow">
        <img :src="arrowIcon" alt="" />
      </div>
    </div>
    <div class="listPersons">
      <router-link
        :to="'/biography/' + person.id.split('/').pop()"
        class="personButton"
        v-for="person in persons"
        :key="person.id"
      >
        {{ person.name }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
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
