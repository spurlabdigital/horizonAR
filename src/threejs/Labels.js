import * as THREE from 'three'

import TextMarker from './TextMarker'
import { useGlobalState } from '../js/store'
import Dot from './Dot'

export default class Labels extends THREE.Group {
  constructor(root) {
    super()
    this.root = root
    this.places = root.places
    this.markers = {}

    this.addTextMarkers()
  }

  addTextMarkers() {
    for (let i = 0; i < this.places.children.length; i++) {
      const marker = this.places.children[i]
      // const textMarker = new TextMarker(marker.name, marker.userData.name)
      // this.markers[marker.name] = textMarker
      // marker.add(textMarker)
      marker.add(new Dot(marker.name))
    }
  }
}
