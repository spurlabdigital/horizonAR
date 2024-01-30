<script setup>
import RedPanel from '../../base/ARedPanel.vue'
import APanelHeader from '../../base/ARedPanelHeader.vue'
import AViewMore from './AViewMore.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCmsStore } from '../../../js/cmsStore'
import ADropDownContainer from './ADropDownContainer.vue'
import ALinkPersonButtons from './ALinkPersonButtons.vue'

const route = useRoute()

const activePerson = computed(() => {
  return route.params.id
})

const cms = useCmsStore()
const person = cms.getPersonBySubID(activePerson.value)

const router = useRouter()
function doClose() {
  router.push({ name: 'horizon' })
}

const personName = computed(() => {
  return person.vorname + ' ' + person.nachname
})
</script>

<template>
  <RedPanel class="SinglePlace" @close="doClose">
    <APanelHeader :text="personName" />
    <AViewMore :to="'/biography/' + person.id.split('/').pop()" />
    <ADropDownContainer name="Stationen">
      <div class="container">
        <div class="line" />
        <li class="stations">
          <ul
            class="station"
            v-for="(station, index) in person.stations"
            :key="station.name"
          >
            <div class="icon">{{ index + 1 }}</div>
            <router-link
              :to="{
                name: 'horizon-place',
                params: { id: station.location.split('/').pop() }
              }"
              class="stationName"
              >{{ station.name }}
            </router-link>
          </ul>
        </li>
      </div>
    </ADropDownContainer>
  </RedPanel>
</template>

<style scoped>
.SinglePlace {
  align-items: start;
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

.station {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}

.stations > * + * {
  margin-top: 1rem;
}

.stations {
  position: relative;
  font-weight: bold;
  padding: 0rem 1rem;
  text-align: left;
  width: 100%;
  list-style: none;
}

.stationName {
  display: inline-block;
  margin-left: 1rem;
}

.container {
  position: relative;
  z-index: 2;
  margin-bottom: 1rem;
}
.line {
  height: 100%;
  background: #ff6632;
  position: absolute;
  top: 0;
  left: 1.75rem;
  width: 4px;
}
</style>
