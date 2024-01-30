import * as THREE from 'three'
import PickerMarker from './PickerMarker'
import { useRoute, useRouter } from 'vue-router'
import { useCmsStore } from '../js/cmsStore'
import ActivePlaceDot from './ActivePlaceDot'

export default class ShowActivePlace extends THREE.Group {
  constructor(root) {
    super()
    this.root = root
    this.places = root.places
    this.activePlaceDots = new THREE.Group()
    this.cmsStore = useCmsStore()

    this.addTextMarkers()

    this.activePlace = null
    this.route = useRoute()
    if (this.route.name === 'horizon-place') {
      this.activePlace = this.route.params.id
      this.updateDot()
    }

    this.router = useRouter()
    this.router.beforeEach((to) => {
      if (to.name === 'horizon-place') {
        this.activePlace = to.params.id
        this.updateDot()
      } else {
        this.activePlace = null
        this.updateDot()
      }
    })

    this.root.deviceHandler.on('updateGeolocation', () => {
      for (const dotKey in this.activePlaceDots.children) {
        this.activePlaceDots.children[dotKey].updatePosition()
      }
    })
  }

  addTextMarkers() {
    for (let i = 0; i < this.places.children.length; i++) {
      const marker = this.places.children[i]
      const textMarker = new ActivePlaceDot(marker, this.root)
      this.activePlaceDots.add(textMarker)
    }
    this.root.rootObject.add(this.activePlaceDots)
  }

  updateDot() {
    if (!this.activePlace) {
      this.activePlaceDots.children.forEach((dot) => {
        dot.visible = false
      })
    } else {
      this.activePlaceDots.children.forEach((dot) => {
        dot.visible = dot.name === this.activePlace
      })
    }
  }
}
