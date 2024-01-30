import * as THREE from 'three'
import { useGlobalState } from '../js/store'
import { Object3D } from 'three'
import anime from 'animejs'
import { useRoute } from 'vue-router'

export default class Dot extends Object3D {
  constructor(name, label) {
    super()

    this.name = name
    this.label = label
    this._alpha = 1

    this.globalStore = useGlobalState()
    this.addDot()
    this.route = useRoute()

    this.globalStore.$onAction((action) => {
      if (this.route.name === 'horizon') {
        if (action.name === 'showPlace' && action.args[0] === this.name) {
          this.spriteMaterial.opacity = 1
          anime({
            targets: this.sprite.scale,
            x: 0.03,
            y: 0.03,
            z: 0.03,
            easing: 'easeInOutQuad',
            duration: 500
          })
          // this.sprite.scale.set(0.03, 0.03, 0.03)
        }
        if (action.name === 'hidePlace' && action.args[0] === this.name) {
          this.spriteMaterial.opacity = 1
          anime({
            targets: this.sprite.scale,
            x: 0.015,
            y: 0.015,
            z: 0.015,
            easing: 'easeInOutQuad',
            duration: 500
          })
          // this.sprite.scale.set(0.02, 0.02, 0.02)
        }
      }
    })
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
    this.sprite.renderOrder = 90
    this.add(this.sprite)
  }
}
