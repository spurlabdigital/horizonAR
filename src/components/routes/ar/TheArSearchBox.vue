<script setup>
import RedPanel from '../../base/ARedPanel.vue'
import APanelHeader from '../../base/ARedPanelHeader.vue'
import { computed, ref, watch } from 'vue'
import { useGlobalState } from '../../../js/store'
import { useCmsStore } from '../../../js/cmsStore'
import ALinkPersonButtons from './ALinkPersonButtons.vue'
import ADropDownContainer from './ADropDownContainer.vue'
import { useRoute } from 'vue-router'
import AViewMore from './AViewMore.vue'

const globalStore = useGlobalState()
const cms = useCmsStore()

const highlightedPlaces = computed(() => {
  let output = []
  for (const placeKey in globalStore.highlightedPlaces) {
    const isPlaceInView = globalStore.highlightedPlaces[placeKey]
    if (isPlaceInView) {
      output.push(cms.getPlacesByID(placeKey))
    }
  }
  return output
})

watch(highlightedPlaces, () => {
  if (highlightedPlaces.value.length < activeSlide.value) {
    activeSlide.value = Math.min(
      activeSlide.value,
      highlightedPlaces.value.length - 1
    )
    activeSlide.value = Math.max(activeSlide.value, 0)
  }
})

const activeSlide = ref(0)
function doShiftRight() {
  activeSlide.value = (activeSlide.value + 1) % highlightedPlaces.value.length
}
function doShiftLeft() {
  let index = activeSlide.value - 1
  if (index < 0) {
    index = highlightedPlaces.value.length - 1
  }
  activeSlide.value = index
}

const activePanel = computed(() => {
  return highlightedPlaces.value[activeSlide.value]
})

watch(activePanel, () => {
  globalStore.setActivePlace(activePanel.value?.id)
})

const numberOfPlaces = computed(() => {
  const activeIndex = activeSlide.value
  const max = highlightedPlaces.value.length
  return activeIndex + 1 + ' von ' + max + ' Orten'
})

const route = useRoute()
const showSearchBox = computed(() => {
  return route.name === 'horizon'
})
</script>

<template>
  <RedPanel v-if="activePanel && showSearchBox" class="noCross">
    <APanelHeader :text="activePanel.name" class="centerText" />
    {{ numberOfPlaces }}
    <AViewMore :to="'/place/' + activePanel.id.split('/').pop()" />

    <ADropDownContainer>
      <ALinkPersonButtons
        :placeID="activePanel.id.split('/').pop()"
        link="horizon-biography"
      />
    </ADropDownContainer>
    <div class="navButtons">
      <div class="navButton pre" @click="doShiftLeft">
        <img src="../../../assets/icons/arrow.svg" alt="pre" />
      </div>
      <div class="navButton" @click="doShiftRight">
        <img src="../../../assets/icons/arrow.svg" alt="pre" />
      </div>
    </div>
  </RedPanel>

  <RouterView />
</template>

<style scoped>
.navButtons {
  margin-top: 0.5rem;
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

<style>
.noCross .closeIcon {
  display: none;
}

.centerText {
  text-align: center;
}
</style>
