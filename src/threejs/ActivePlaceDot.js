import * as THREE from 'three'
import { useGlobalState } from '../js/store'
import { Object3D } from 'three'
import anime from 'animejs'

export default class ActivePlaceDot extends Object3D {
  constructor(marker) {
    super()

    this.markerRef = marker

    this.position.copy(this.markerRef.position)
    this.name = this.markerRef.name.split('/').pop()
    this._alpha = 1
    this.visible = false

    this.addDot()
  }

  updatePosition() {
    this.position.copy(this.markerRef.position)
  }

  addDot() {
    const spriteMap = new THREE.TextureLoader().load('./dot.png')
    this.spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
      transparent: true,
      opacity: 1,
      color: new THREE.Color('#FF6632'),
      sizeAttenuation: false,
      depthWrite: false,
      depthTest: false
    })

    this.sprite = new THREE.Sprite(this.spriteMaterial)

    this.sprite.scale.set(0.05, 0.05, 0.05)
    this.sprite.renderOrder = 1000
    this.add(this.sprite)
  }
}
