import * as THREE from 'three'

export default class Numbers extends THREE.Group {
  constructor(root, person) {
    super()
    this.root = root
    this.marker = root.places.children

    this.name = person.id
    this._alpha = 0

    this.aktivePerson = person
    this.getStationsPositions()
  }

  get highlight() {
    return this._alpha
  }

  set highlight(value) {
    this._alpha = value
    this.traverse((child) => {
      if (child.type === 'Sprite') {
        child.material.opacity = this._alpha
      }
    })
  }

  updatePosition() {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      if (child.name === 'pivot') continue

      const parent = this.root.places.children.find((marker) => {
        return marker.name === child.name
      })

      if (child.userData.shift === true) {
        const tempX = parent.position.x
        const x = tempX * Math.cos(0.065) - parent.position.z * Math.sin(0.065)
        const z = tempX * Math.sin(0.065) + parent.position.z * Math.cos(0.065)

        child.position.set(x, parent.position.y, z)
      } else {
        child.position.copy(parent.position)
      }
    }
  }
  getStationsPositions() {
    const stations = this.aktivePerson.stations
    const userData = []

    stations.forEach((station) => {
      const findStationMarker = this.marker.find((marker) => {
        return marker.name === station.location
      })
      if (findStationMarker === undefined) {
        console.error('findStationMarker', station)
      } else {
        userData.push(findStationMarker.userData)
      }
    })

    this.addNumber(userData)
  }

  addNumber(userData) {
    let history = ''

    for (let lineIndex = 0; lineIndex < userData.length; lineIndex++) {
      const startPoint = userData[lineIndex].position
      const id = userData[lineIndex].name

      const spriteMap = new THREE.TextureLoader().load(
        './' + (lineIndex + 1) + '.png'
      )
      const spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        transparent: true,
        opacity: this._alpha,
        color: new THREE.Color('#ffffff'),
        sizeAttenuation: false,
        depthWrite: false,
        depthTest: false
      })
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.name = userData[lineIndex].id

      sprite.position.set(startPoint.x, startPoint.y, startPoint.z)

      sprite.scale.set(0.05, 0.05, 0.05)
      sprite.renderOrder = 110
      sprite.userData.shift = false
      if (history.includes(id)) {
        sprite.userData.shift = true
        const tempX = sprite.position.x
        sprite.position.x =
          tempX * Math.cos(0.065) - sprite.position.z * Math.sin(0.065)
        sprite.position.z =
          tempX * Math.sin(0.065) + sprite.position.z * Math.cos(0.065)
      }

      this.add(sprite)
      history += id + '__'
    }
  }
}
