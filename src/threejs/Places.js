import * as THREE from 'three'
import { useCmsStore } from '../js/cmsStore'
import { calcAngle, calcDistance, getGPSPosition } from './vvv/geoHelper'
import { useGlobalState } from '../js/store'
import { MathUtils } from 'three'
import TextMarker from './TextMarker'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

export default class Places extends THREE.Group {
  constructor(root) {
    super()
    this.root = root
    this.mainloop = root.mainloop
    this.camera = root.camera

    this.gps = this.root.deviceHandler.gps

    // this.syncGPSPositions()

    this.cmsStore = useCmsStore()
    this.globalStore = useGlobalState()

    this.userData.places = {}
    this.route = useRoute()

    this.addLocations()
    this.mainloop.on('update', () => {
      if (this.route.name === 'horizon-biography') {
        this.setNoPlaces()
      } else {
        this.checkMarkerVisibility()
      }
    })

    this.root.deviceHandler.on('updateGeolocation', () => {
      this.handleGPSUpdate()
    })
  }

  handleGPSUpdate() {
    for (const child of this.children) {
      const newPosition = this.GPSPositionToVector3(
        child.userData.latitude,
        child.userData.longitude
      )

      child.position.set(newPosition.x, newPosition.y, newPosition.z)
      child.lookAt(this.camera.position)

      child.userData.rotation = newPosition.rotation
      child.userData.position = {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z
      }
      child.userData.distance = newPosition.distance
    }
  }

  addLocations() {
    const places = this.cmsStore.getPlaces

    places.forEach((place) => {
      const vector = this.GPSPositionToVector3(
        place.location.lat,
        place.location.lon
      )
      const location = new THREE.Object3D()
      location.position.set(vector.x, vector.y, vector.z)
      location.lookAt(this.camera.position)
      location.name = place.id

      this.root.threejsStore.places[location.name] = false

      location.userData.name = place.name
      location.userData.id = place.id
      location.userData.longitude = place.location.lon
      location.userData.latitude = place.location.lat

      location.userData.rotation = vector.rotation
      location.userData.position = {
        x: vector.x,
        y: vector.y,
        z: vector.z
      }
      location.userData.distance = vector.distance
      this.add(location)
    })
  }

  GPSPositionToVector3(latitude, longitude) {
    let angle = calcAngle(
      latitude,
      longitude,
      this.gps.latitude,
      this.gps.longitude
    )

    const distance = calcDistance(
      latitude,
      longitude,
      this.gps.latitude,
      this.gps.longitude
    )

    const rotation = -MathUtils.degToRad(angle)
    let clampedDistance = MathUtils.clamp(distance, 0, 1000)
    let pseudoDistance = MathUtils.mapLinear(clampedDistance, 0, 1000, 250, 250)
    let pseudoHeight = MathUtils.mapLinear(clampedDistance, 0, 1000, 0, 50)

    const x = Math.sin(rotation) * pseudoDistance
    const y = pseudoHeight
    const z = Math.cos(rotation) * pseudoDistance

    return { x, y, z, rotation, distance }
  }

  setNoPlaces() {
    this.children.forEach((marker) => {
      this.globalStore.hidePlace(marker.name)
    })
  }
  checkMarkerVisibility() {
    this.camera.rotation.order = 'YXZ'
    const angle1 =
      (this.camera.rotation.y - this.root.rootObject.rotation.y + Math.PI / 2) %
      (Math.PI * 2)
    const range = ((Math.PI * 2) / 360) * 5

    this.children.forEach((marker) => {
      const angle2 =
        (marker.userData.rotation + Math.PI + Math.PI / 2) % (Math.PI * 2)

      let absoluteDifference = Math.abs(angle1 - angle2)
      if (absoluteDifference > Math.PI) {
        absoluteDifference = Math.abs(Math.PI * 2 - absoluteDifference)
      }

      const isInRange = absoluteDifference < range

      if (this.userData.places[marker.name] !== isInRange) {
        this.userData.places[marker.name] = isInRange
        if (isInRange) {
          this.globalStore.showPlace(marker.name)
        } else {
          this.globalStore.hidePlace(marker.name)
        }
        this.root.threejsStore.trigger('markerChange', [this.userData.places])
      }
    })
  }
}
