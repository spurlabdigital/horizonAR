<script setup>
import { computed } from 'vue'
import { useGlobalState } from '../js/store'
import CrossIcon from '../assets/vueIcons/CrossIcon.vue'
import HomeIocn from '../assets/vueIcons/HomeIocn.vue'
import CameraIcon from '../assets/vueIcons/CameraIcon.vue'
import PersonIcon from '../assets/vueIcons/PersonIcon.vue'
import PlaceIcon from '../assets/vueIcons/PlaceIcon.vue'
import InfoIcon from '../assets/vueIcons/InfoIcon.vue'
import router from '../js/router'
import MapIcon from '../assets/vueIcons/MapIcon.vue'

const globalState = useGlobalState()

const hidden = computed(() => {
  return globalState.sidebarVisible
})

function closeSidebar() {
  globalState.hideSidebar()
}

function isRoute(state) {
  if (router.currentRoute.value.name) {
    return router.currentRoute.value.name.includes(state)
  } else {
    return false
  }
}
</script>

<template>
  <div :class="{ hidden: !hidden }" class="SideBar">
    <div @click="closeSidebar">
      <CrossIcon />
    </div>
    <router-link
      to="/"
      class="button"
      :class="{ active: isRoute('Home') }"
      @click="closeSidebar"
    >
      <span>Start</span>
      <HomeIocn />
      <div class="blocker" />
    </router-link>
    <router-link
      @click="closeSidebar"
      to="/horizon"
      class="button"
      :class="{ active: isRoute('horizon') }"
    >
      <span>Horizont</span>
      <CameraIcon />
      <div class="blocker" />
    </router-link>
    <router-link
      @click="closeSidebar"
      to="/biographies"
      class="button"
      :class="{ active: isRoute('biographies') }"
    >
      <span>Personen</span>
      <PersonIcon />
      <div class="blocker" />
    </router-link>
    <router-link
      @click="closeSidebar"
      to="/places"
      class="button"
      :class="{ active: isRoute('place') }"
    >
      <span>Orte</span>
      <MapIcon />
      <div class="blocker" />
    </router-link>

    <router-link
      @click="closeSidebar"
      to="/map"
      class="button"
      :class="{ active: isRoute('map') }"
    >
      <span>Karte</span>
      <PlaceIcon />
      <div class="blocker" />
    </router-link>

    <router-link
      @click="closeSidebar"
      to="/info"
      class="button"
      :class="{ active: isRoute('info') }"
    >
      <span>Info</span>
      <InfoIcon />
      <div class="blocker" />
    </router-link>
  </div>
  <div
    class="SidebarBlocker"
    :class="{ hiddenBlocker: !hidden }"
    @click="closeSidebar"
  />
</template>

<style scoped>
.SidebarBlocker {
  position: fixed;

  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1001;
  transition: all 0.2s ease-in-out;
}
.hiddenBlocker {
  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;
  transition: all 0.2s ease-in-out;
}
.SideBar {
  position: fixed;
  width: 50%;
  height: 100svh;
  top: 0;
  right: 0;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  background-color: #fcfcfc;
  box-shadow: -10px 0 100px rgba(0, 0, 0, 0.2);

  z-index: 1002;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 2rem;
  gap: 3rem;
  color: #767676;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.06rem;
  transition: all 0.2s ease-in-out;
}

.hidden {
  right: -50%;
  box-shadow: -10px 0 100px rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
}

.cross {
  position: absolute;
  top: 2rem;
  right: 2rem;
}

.button {
  display: flex;
  align-items: center;
}

.button span {
  margin-right: 2rem;
}

.button svg {
  width: 1.5rem;
  height: 1.5rem;
}

.blocker {
  height: 3rem;
  width: 0px;
  position: absolute;
  right: 0;
  background-color: var(--orange);
  z-index: 2;
  transition: all 0.2s ease-in-out;
}
</style>

<style>
.active {
  color: var(--orange) !important;
  transition: all 0.2s ease-in-out;
}

.active .blocker {
  width: 4px;
  transition: all 0.5s ease-in-out;
}
.active svg path {
  stroke: #ff6632 !important;
  stroke-width: 3;
  transition: all 0.2s ease-in-out;
}
</style>
