import { defineStore } from 'pinia'

export const useGlobalState = defineStore({
  id: 'globalState',
  state: () => ({
    activeState: 'home',
    gps: {
      latitude: 52.39166923812494,
      longitude: 13.062920385818979,
      accuracy: 1
    },
    showAR: false,
    isTrusted: false,
    isMobile: true,
    sidebarVisible: false,
    activeSlide: 0,
    activePerson: null,
    activePlace: null,
    highlightedPlaces: {}
  }),
  getters: {
    getActiveState: (state) => state.activeState
  },
  actions: {
    setTrusted(newTrusted) {
      this.isTrusted = newTrusted
    },
    setARMode(newMode) {
      this.showAR = newMode
    },
    showSidebar() {
      this.sidebarVisible = true
    },
    hideSidebar() {
      this.sidebarVisible = false
    },
    showPlace(placeID) {
      this.highlightedPlaces[placeID] = true
    },
    hidePlace(placeID) {
      this.highlightedPlaces[placeID] = false
    },
    setActivePerson(newPerson) {
      this.activePerson = newPerson
    },
    setActivePlace(newPlace) {
      this.activePlace = newPlace
    },
    setGPS(newGPS) {
      this.gps = newGPS
    }
  }
})

export const useOrientation = defineStore({
  id: 'Orientation',
  state: () => ({
    gps: {
      latitude: null,
      accuracy: null,
      longitude: null
    },
    orientation: {
      alpha: null,
      beta: null,
      gamma: null,
      webkitCompassHeading: null,
      webkitCompassAccuracy: null,
      firstValue: null
    }
  })
})
