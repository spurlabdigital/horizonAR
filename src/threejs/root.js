import * as THREE from 'three'
import Shishi from './shishi.js'

import RootPatch from './vvv/rootPatch/rootPatch.js'
import Places from './Places'
import { DeviceOrientationControlsIOS } from './shared/DeviceOrientationControllsIOS'
import { WebcamRenderer } from './shared/webcamRenderer'
import PathLines from './PathLines'
import ThreejsStore from './threejsStore'

import { useGlobalState } from '../js/store'
import Picker from './Picker'
import ShowActivePlace from './ShowActivePlace'
import PlaceDots from './PlaceDots'
import DeviceHandling from './DeviceHandling'
import { DeviceOrientationControlsAndroid } from './shared/DeviceOrientationAndroid'

export default class Root extends RootPatch {
  constructor() {
    super()

    this.deviceHandler = new DeviceHandling()

    this.rootObject = new THREE.Scene()

    const globalStore = useGlobalState()

    this.deviceHandler.on('newHeading', () => {
      // console.log('newHeading')
      this.rootObject.rotation.y =
        this.deviceHandler.gps.heading * (Math.PI / 180)

      if (this.deviceHandler.ios) {
        console.log('Add iOS Controls')
                this.controls.enabled = false

        this.deviceControll = new DeviceOrientationControlsIOS(this.camera)

      } else {
        console.log('Add Android Controls')
                this.controls.enabled = false

        this.deviceControll = new DeviceOrientationControlsAndroid(this.camera)
      }
    })

    if (globalStore.isMobile) {
      // this.controls.enabled = false
      this.webcamRenderer = new WebcamRenderer(this.renderer)

      this.mainloop.on('update', () => {
        this.webcamRenderer.update()

        if (this.deviceControll) {
          this.deviceControll.update()
        }
        this.renderer.update()
      })
    }

    this.threejsStore = new ThreejsStore()

    this.scene.add(this.rootObject)

    this.camera.setViewOffset(
      this.renderer.domElement.width,
      this.renderer.domElement.height,
      0,
      this.renderer.domElement.height * -0.2,
      this.renderer.domElement.width,
      this.renderer.domElement.height
    )

    this.places = new Places(this)
    this.scene.add(this.places)

    this.placeDots = new PlaceDots(this)

    // //Handle horizon-place route
    this.activePlace = new ShowActivePlace(this)
    //
    // //handle horizon-biography route
    this.rootObject.add(new PathLines(this))

    // Display Text Labels (horizon-place route, horizon-biography route)
    this.picker = new Picker(this)

    this.rootObject.add(new Shishi())
  }
}
