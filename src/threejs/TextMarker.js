import * as THREE from 'three'
import { Text } from 'troika-three-text'
import anime from 'animejs'
import { MathUtils } from 'three'
import { useGlobalState } from '../js/store'
import { useCmsStore } from '../js/cmsStore'

export default class TextMarker extends Text {
  constructor(name, label) {
    super()

    this.name = name
    this.label = label
    this._alpha = 1
    this.addDot()

    this.globalStore = useGlobalState()
    this.cmsStore = useCmsStore()

    this.globalStore.$onAction((action) => {
      if (action.name === 'setActivePlace') {
        if (action.args[0] === this.name) {
          this.fillOpacity = 1
          this.spriteMaterial.opacity = 1
        } else {
          this.fillOpacity = 0
          this.spriteMaterial.opacity = 0
        }
      }
    })
  }

  addText() {
    this.text = this.label
    this.fillOpacity = 0
    this.fontSize = 5
    this.anchorY = 10
    this.anchorX = 'left'
    this.maxWidth = 80
    this.textAlign = 'center'
    this.material.depthWrite = false
    this.material.depthTest = false
    this.material.transparent = true
    this.renderOrder = 11

    this.sync()
  }

  addDot() {
    const spriteMap = new THREE.TextureLoader().load('./dot.png')
    this.spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
      transparent: true,
      opacity: 1,
      color: new THREE.Color('#ff7700'),
      sizeAttenuation: false,
      depthWrite: false,
      depthTest: false
    })

    this.sprite = new THREE.Sprite(this.spriteMaterial)

    this.sprite.renderOrder = 91

    this.sprite.scale.set(0.03, 0.03, 0.03)
    this.add(this.sprite)
  }
}
