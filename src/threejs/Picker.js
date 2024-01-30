import * as THREE from 'three'
import PickerMarker from './PickerMarker'
import { useRoute, useRouter } from 'vue-router'
import { useCmsStore } from '../js/cmsStore'

export default class Picker extends THREE.Group {
  constructor(root) {
    super()
    this.root = root
    this.places = root.places
    this.markers = new THREE.Group()
    this.cmsStore = useCmsStore()

    this.addTextMarkers()

    this.activePerson = null
    this.activePlace = null
    this.route = useRoute()
    if (this.route.name === 'horizon-biography') {
      this.activePerson = this.route.params.id
      this.handlePersonRoute()
    }

    if (this.route.name === 'horizon-place') {
      this.activePlace = this.route.params.id
      this.handlePlaceRoute()
    }

    this.router = useRouter()
    this.router.beforeEach((to) => {
      if (to.name === 'horizon-biography') {
        this.activePerson = to.params.id
        this.handlePersonRoute()
      } else if (to.name === 'horizon-place') {
        this.activePlace = to.params.id
        this.handlePlaceRoute()
      } else {
        this.activePlace = null
        this.handlePlaceRoute()
        this.activePerson = null
        this.handlePersonRoute()
      }
    })

    this.root.mainloop.on('update', () => {
      // this.rotateLabels()
    })

    this.root.deviceHandler.on('updateGeolocation', () => {
      for (const key in this.markers.children) {
        this.markers.children[key].updatePosition()
      }
    })
  }

  rotateLabels() {
    for (const marker of this.markers.children) {
      marker.quaternion.copy(this.root.camera.quaternion)
    }
  }

  addTextMarkers() {
    for (let i = 0; i < this.places.children.length; i++) {
      const marker = this.places.children[i]
      const textMarker = new PickerMarker(marker, this.root)
      this.markers.add(textMarker)
    }
    this.root.rootObject.add(this.markers)
  }

  handlePersonRoute() {
    if (!this.activePerson) {
      this.markers.children.forEach((marker) => {
        marker.visible = false
      })
      return
    }

    const person = this.cmsStore.getPersonBySubID(this.activePerson)

    this.markers.children.forEach((marker) => {
      const number = person.stations.findIndex((station) => {
        return station.location === marker.name
      })

      if (number === -1) {
        marker.visible = false
      } else {
        const shiftFaktor = 10
        marker.children[0].scale.y = number * shiftFaktor + marker.basicHeight
        marker.children[0].position.y =
          (number * shiftFaktor + marker.basicHeight) / 2

        marker.position.y = number * -shiftFaktor

        marker.visible = true
      }
    })
  }

  handlePlaceRoute() {
    if (!this.activePlace) {
      this.markers.children.forEach((marker) => {
        marker.visible = false
      })
      return
    }

    this.markers.children.forEach((marker) => {
      marker.visible = marker.name.split('/').pop() === this.activePlace
    })
  }
}
