<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useGlobalState } from '../../../js/store'
import RootPatch from '../../../threejs/root.js'

const globalState = useGlobalState()

const showARPanel = computed(() => {
  return globalState.showAR
})

const disableGPS = ref(false)

onMounted(() => {
  window.rootPatch = new RootPatch()
})

function toggleGPS() {
  disableGPS.value = !disableGPS.value
  window.rootPatch.deviceHandler.switchGPS()
}
</script>

<template>
  <div class="gpsIcon" @click="toggleGPS">
    <div class="flexBox" v-show="disableGPS">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="29"
        viewBox="0 0 30 29"
        fill="none"
      >
        <path
          d="M1 13.7895L29 1L15.7368 28L12.7895 16.6316L1 13.7895Z"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="textLabel">Potsdam</span>
    </div>
    <div class="flexBox" v-show="!disableGPS">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="29"
        viewBox="0 0 30 29"
        fill="white"
      >
        <path
          d="M1 13.7895L29 1L15.7368 28L12.7895 16.6316L1 13.7895Z"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="textLabel">Mein Standort</span>
    </div>
  </div>
  <div id="ThreejsPanel" :class="{ hidden: !showARPanel }" />
</template>

<style scoped>
.gpsIcon {
  position: absolute;
  margin: 0.5rem 0rem;
  padding: 1rem;
  top: 0;
  left: 0;
  z-index: 1;
}

.flexBox {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.disableGPS {
  opacity: 0.2;
}

.textLabel {
  color: white;
  padding-left: 0.5rem;
}

#ThreejsPanel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hidden {
  z-index: -1 !important;
  pointer-events: none !important;
}
</style>
