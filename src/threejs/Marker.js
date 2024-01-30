import * as THREE from 'three'
import { Text } from 'troika-three-text'
import { degToRad, mapLinear } from 'three/src/math/MathUtils.js'
import { MathUtils } from 'three'
import { calcAngle, calcDistance } from './vvv/geoHelper'

export default class Marker extends THREE.Object3D {
  constructor(place) {
    super()

    this._alpha = 1

    this.rootGPSPos = {
      latitude: 52.39166923812494,
      longitude: 13.062920385818979
    }

    this.gpsPos = {
      longitude: place.location.lon,
      latitude: place.location.lat
    }

    this.cartesianPosition = {
      x: 0,
      y: 0,
      z: 0
    }

    this.userData = place
    this.userData.active = false
    this.name = place.name

    this.addDot()
    this.addText()
  }

  set alpha(value) {
    this._alpha = value
    this.textLabel.fillOpacity = value
  }

  updateRootPosition(longitude, latitude) {
    this.rootGPSPos.longitude = longitude
    this.rootGPSPos.latitude = latitude

    this.setTextLabelPosition()
  }

  addText() {
    this.textLabel = new Text()

    this.setTextLabelPosition()
    this.add(this.textLabel)

    this.textLabel.text = this.name

    this.textLabel.fontSize = 10
    this.textLabel.anchorY = 5
    this.textLabel.anchorX = 'center'
    this.textLabel.maxWidth = 80
    this.textLabel.textAlign = 'center'
    this.textLabel.material.depthWrite = false
    this.textLabel.material.depthTest = false
    this.textLabel.material.transparent = true
    this.textLabel.renderOrder = 1

    // this.textLabel.rotation.z = Math.PI / 2

    this.textLabel.sync()
  }

  setTextLabelPosition() {
    const angle = calcAngle(
      this.rootGPSPos.latitude,
      this.rootGPSPos.longitude,
      this.gpsPos.latitude,
      this.gpsPos.longitude
    )

    const distance = calcDistance(
      this.rootGPSPos.latitude,
      this.rootGPSPos.longitude,
      this.gpsPos.latitude,
      this.gpsPos.longitude
    )

    this.userData.distance = distance

    this.rotation.y = -degToRad(angle)

    let clampedDistance = MathUtils.clamp(distance, 0, 1000)
    let pseudoDistance = mapLinear(clampedDistance, 0, 1000, 150, 250)
    let pseudoHeight = mapLinear(clampedDistance, 0, 1000, 0, 50)

    this.textLabel.position.z = -pseudoDistance
    this.textLabel.position.y = pseudoHeight

    this.sprite.position.z = -pseudoDistance
    this.sprite.position.y = pseudoHeight

    this.calcCartesianPosition()
  }

  calcCartesianPosition() {
    this.cartesianPosition.y = this.textLabel.position.y

    this.cartesianPosition.z =
      Math.cos(this.rotation.y) * this.textLabel.position.z
    this.cartesianPosition.x =
      Math.sin(this.rotation.y) * this.textLabel.position.z

    this.userData.cartesianPosition = this.cartesianPosition
  }

  addDot() {
    //add sprite
    const spriteMap = new THREE.TextureLoader().load('./dot.png')
    const spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
      transparent: true,
      color: new THREE.Color('#ffffff'),
      sizeAttenuation: false,
      depthWrite: false,
      depthTest: false
    })
    this.sprite = new THREE.Sprite(spriteMaterial)

    this.sprite.scale.set(0.04, 0.04, 0.04)
    this.sprite.renderOrder = 4
    // this.add(this.sprite)
  }
}
