import * as THREE from 'three'
import Stats from 'stats.js'

export default class Renderer extends THREE.WebGLRenderer {
  constructor(rootPatch) {
    super({
      canvas: rootPatch.output.canvas,
      antialias: true,
      alpha: false
    })

    this.mainLoop = rootPatch.mainloop
    this.scene = rootPatch.scene
    this.camera = rootPatch.camera
    this.output = rootPatch.output

    this.init()
    // this.showStats()

    this.output.on('resize', () => {
      this.setSize(this.output.width, this.output.height)
      this.setPixelRatio(this.output.pixelRatio)
    })

    this.mainLoop.on('update', () => {
      this.update()
    })
  }

  init() {
    this.setSize(this.output.width, this.output.height)
    this.setPixelRatio(this.output.pixelRatio)
  }

  showStats() {
    this.stats = new Stats()
    this.stats.showPanel(0)
    document.body.appendChild(this.stats.dom)
  }

  hideStats() {
    document.body.removeChild(this.stats.dom)
    this.stats = null
  }

  update() {
    if (this.stats) {
      this.stats.begin()
      this.render(this.scene, this.camera)
      this.stats.end()
    } else {
      this.render(this.scene, this.camera)
    }
  }
}
