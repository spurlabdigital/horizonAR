import * as THREE from 'three'
import { Text } from 'troika-three-text'
import { useGlobalState } from '../js/store'
import { useCmsStore } from '../js/cmsStore'

export default class PickerMarker extends Text {
  constructor(marker) {
    super()

    this.parentMarker = marker
    this.name = this.parentMarker.name
    this.label = this.parentMarker.userData.name
    this.rootPosition = this.parentMarker.position.clone()

    this._alpha = 1
    this.addText()
    this.addLine()
    this.visible = false

    this.globalStore = useGlobalState()
    this.cmsStore = useCmsStore()
  }

  updatePosition() {
    this.rootPosition = this.parentMarker.position.clone()

    this.position.x = this.rootPosition.x
    this.position.z = this.rootPosition.z
    this.lookAt(0, 0, 0)

    this.sync()
  }
  addText() {
    this.text = this.label
    this.fillOpacity = 1
    this.fontSize = 10
    this.anchorY = 5
    this.anchorX = -2
    this.maxWidth = 150
    this.textAlign = 'start'
    this.material.depthWrite = false
    this.material.depthTest = false
    this.material.transparent = true
    this.renderOrder = 11

    this.position.set(this.rootPosition.x, 0, this.rootPosition.z)
    this.lookAt(0, 0, 0)

    this.sync()
  }

  addLine() {
    this.basicHeight = this.rootPosition.y
    //add box
    const geometry = new THREE.BoxGeometry(0.67, 1, 0.67)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffffff'),
      transparent: true,
      opacity: 0.75
    })
    this.box = new THREE.Mesh(geometry, material)
    this.box.scale.y = this.basicHeight
    this.box.position.set(0, this.basicHeight / 2, 0)

    this.add(this.box)
  }
}
