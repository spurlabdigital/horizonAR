import * as THREE from 'three'
import { useGlobalState } from '../js/store'
import { Object3D } from 'three'
import { useRoute } from 'vue-router'
import { lerp } from 'three/src/math/MathUtils'

export default class PlaceDot extends Object3D {
  constructor(place) {
    super()

    this.parentPlace = place
    this.name = this.parentPlace.name
    this._highlight = 0
    this.colorize = false

    this.globalStore = useGlobalState()
    this.addDot()
    this.route = useRoute()

    this._orange = new THREE.Color('#FF6632')
    this._white = new THREE.Color('#ffffff')
  }

  set highlight(value) {
    const size = lerp(0.015, 0.03, value)
    this.sprite.scale.setScalar(size)
  }

  get highlight() {
    return this._highlight
  }

  set colorize(value) {
    if (this.spriteMaterial) {
      this.sprite.material.color = value ? this._orange : this._white
    }
  }

  updateDotPosition() {
    this.sprite.position.copy(this.parentPlace.position)
  }

  addDot() {
    const spriteMap = new THREE.TextureLoader().load('./dot.png')
    this.spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
      transparent: true,
      opacity: 1,
      color: new THREE.Color('#ffffff'),
      sizeAttenuation: false,
      depthWrite: false,
      depthTest: false
    })

    this.sprite = new THREE.Sprite(this.spriteMaterial)

    this.sprite.scale.set(0.015, 0.015, 0.015)
    this.sprite.position.copy(this.parentPlace.position)

    this.sprite.renderOrder = 90
    this.add(this.sprite)
  }
}
