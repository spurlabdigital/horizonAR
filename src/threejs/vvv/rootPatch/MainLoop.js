import EventEmitter from '../globals/eventEmitter.js'
import * as THREE from 'three'

export default class MainLoop extends EventEmitter {
  constructor() {
    super()
    this.targetFps = 60
    this.lastTick = 0
    this.initTime = Date.now()

    window.requestAnimationFrame(() => {
      this.update()
    })
  }

  setTargetFps(fps) {
    this.targetFps = fps
  }

  trigger(_name, _args) {
    return super.trigger(_name, _args)
  }

  update() {
    const currentTime = Date.now()

    if (currentTime - this.lastTick >= Math.floor(1000 / this.targetFps)) {
      this.trigger('update')
      this.lastTick = currentTime
      this.elapsedTime = currentTime - this.initTime
    }

    requestAnimationFrame(() => {
      this.update()
    })
  }
}
