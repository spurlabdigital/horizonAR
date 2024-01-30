import EventEmitter from '../globals/eventEmitter.js'
import * as THREE from 'three'

export default class EventBridge extends EventEmitter {
  constructor() {
    super()
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
