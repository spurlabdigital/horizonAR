import { getGPSPosition } from './vvv/geoHelper'
import EventEmitter from './vvv/globals/eventEmitter'
import { useGlobalState } from '../js/store'
import { DeviceOrientationControlsIOS } from './shared/DeviceOrientationControllsIOS'

export default class DeviceHandling extends EventEmitter {
  constructor(root) {
    super()

    this.root = root

    this.globalStore = useGlobalState()

    this.gps = {
      latitude: this.globalStore.gps.latitude,
      longitude: this.globalStore.gps.longitude,
      heading: 0,
      headingAccuracy: 360
    }

    this.gpsHistory = {
      latitude: 52.39166923812494,
      longitude: 13.062920385818979
    }

    this.realGPS = {
      latitude: this.globalStore.gps.latitude,
      longitude: this.globalStore.gps.longitude
    }

    this.gpsHistoryMode = false
    this.firstRealEvent = false

    console.log(this.isIOS())

    this.ios = this.isIOS()
    this.getLocation()

    // this.root.mainloop.on('update', () => {
    //   this.gps.heading = this.gps.heading + 0.1
    //   this.trigger('newHeading')
    // })
  }

  getLocation() {
    if (this.ios) {
      this.updateiOSHeading()
    } else {
      console.log('updateAndroidHeading')
      setTimeout(() => {
        this.trigger('newHeading')
      },10)
    }
    this.updateGPSPosition()
  }

  // setTimer() {
  //   this.updateGPSPosition()
  //   this.updateiOSHeading()
  //   setInterval(() => {
  //     this.updateGPSPosition()
  //     this.updateiOSHeading()
  //   }, 1000 * 5)
  // }

  isIOS() {
    return (
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    )
  }
  updateiOSHeading() {
    window.addEventListener('deviceorientation', (event) => {
      if (
        event.webkitCompassAccuracy < this.gps.headingAccuracy &&
        event.webkitCompassAccuracy > 1 &&
        !this.firstRealEvent
      ) {
        this.firstRealEvent = true
        this.gps.heading = event.webkitCompassHeading
        this.gps.headingAccuracy = event.webkitCompassAccuracy
        // console.log('heading', this.gps.heading)

        this.trigger('newHeading')
      }
    })
  }


  switchGPS() {
    this.gpsHistoryMode = !this.gpsHistoryMode
    if (this.gpsHistoryMode) {
      this.gps.longitude = this.gpsHistory.longitude
      this.gps.latitude = this.gpsHistory.latitude
    } else {
      this.gps.longitude = this.realGPS.longitude
      this.gps.latitude = this.realGPS.latitude
    }

    this.trigger('updateGeolocation')
  }

  updateGPSPosition() {
    getGPSPosition().then((pos) => {
      const posBuffer = pos
      if (posBuffer) {
        this.gps.longitude = posBuffer.longitude
        this.gps.latitude = posBuffer.latitude

        this.realGPS.longitude = posBuffer.longitude
        this.realGPS.latitude = posBuffer.latitude
      } else {
        this.gps.longitude = 13.062920385818979
        this.gps.latitude = 52.39166923812494
      }

      this.trigger('updateGeolocation')
    })
  }
}
