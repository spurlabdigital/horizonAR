import * as THREE from 'three'
import { useGlobalState } from '../js/store'
import PlaceDot from './PlaceDot'
import { useRoute } from 'vue-router'

export default class PlaceDots extends THREE.Group {
  constructor(root) {
    super()
    this.root = root
    this.places = root.places
    this.markers = {}

    this.addDots()

    this.globalStore = useGlobalState()
    this.route = useRoute()

    this.globalStore.$onAction((action) => {
      if (action.name === 'showPlace' && action.args[0]) {
        this.markers[action.args[0]].highlight =
          this.route.name === 'horizon' ? 1 : 0
      }
      if (action.name === 'hidePlace' && action.args[0]) {
        this.markers[action.args[0]].highlight = 0
      }
      if (action.name === 'setActivePlace' && action.args[0]) {
        for (const markersKey in this.markers) {
          const highLight = markersKey === action.args[0]

          this.markers[markersKey].colorize =
            this.route.name === 'horizon' ? highLight : 0
        }
      }
    })

    this.root.deviceHandler.on('updateGeolocation', () => {
      for (const markersKey in this.markers) {
        this.markers[markersKey].updateDotPosition()
      }
    })
  }

  addDots() {
    for (let i = 0; i < this.places.children.length; i++) {
      const places = this.places.children[i]

      this.markers[places.name] = new PlaceDot(places)
      this.add(this.markers[places.name])
    }

    this.root.rootObject.add(this)
  }
}
