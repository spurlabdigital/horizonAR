import { defineStore } from 'pinia'

export const useCmsStore = defineStore({
  id: 'cms',
  state: () => ({
    language: 'de',
    loaded: false,
    de: {
      persons: null,
      places: null,
      info: null,
      startPage: null
    },
    en: {
      persons: null,
      places: null,
      info: null,
      startPage: null
    }
  }),
  getters: {
    getContent: (state) => state[state.language],
    getPlaces: (state) => state[state.language].places,
    getInfoSites: (state) => state[state.language].info,
    getStartPage: (state) => state[state.language].startPage,
    getPersons: (state) => state[state.language].persons,
    getPersonByID: (state) => (id) => {
      return state[state.language].persons.find((person) => person.id === id)
    },
    getPersonBySubID: (state) => (id) => {
      return state[state.language].persons.find(
        (person) => person.id.split('/').pop() === id
      )
    },
    getPlacesByID: (state) => (id) => {
      return state[state.language].places.find((place) => place.id === id)
    },
    getPlacesBySubID: (state) => (id) => {
      return state[state.language].places.find(
        (place) => place.id.split('/').pop() === id
      )
    }
  },
  actions: {
    setLanguage(newLanguage) {
      this.language = newLanguage
    },
    addPersonsToPlaces(lng) {
      this[lng].persons.forEach((person) => {
        if (person.stations.length < 1) return
        person.stations.forEach((station) => {
          const localID = station.location

          this[lng].places.find((place) => {
            if (place.id === localID) {
              if (!place.persons) {
                place.persons = []
              }
              if (!place.persons.includes(person)) {
                place.persons.push(person)
              }
            }
          })
        })
      })
    },
    fetchData() {

      fetch(globalSettings.cmsURL + 'de/api/places.json')
        .then((response) => response.json())
        .then((data) => {
          this.de.places = data
          if (this.de.persons) {
            this.addPersonsToPlaces('de')
          }
          checkIfLoaded(this)
        })
      fetch(globalSettings.cmsURL + 'de/api/persons.json')
        .then((response) => response.json())
        .then((data) => {
          this.de.persons = data
          if (this.de.places) {
            this.addPersonsToPlaces('de')
          }
          checkIfLoaded(this)
        })
      fetch(globalSettings.cmsURL + 'de/api/info.json')
        .then((response) => response.json())
        .then((data) => {
          this.de.info = data
          checkIfLoaded(this)
        })
      fetch(globalSettings.cmsURL + 'de/api/start.json')
        .then((response) => response.json())
        .then((data) => {
          this.de.startPage = data[0]
          checkIfLoaded(this)
        })
    }
  }
})

function checkIfLoaded(context) {
  if (
    context.de.info &&
    context.de.persons &&
    context.de.places &&
    context.de.startPage
  ) {
    context.loaded = true
  }
}
