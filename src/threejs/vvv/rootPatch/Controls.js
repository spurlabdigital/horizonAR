import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Controls extends OrbitControls {
  constructor(root) {
    super(root.camera, root.output.canvas)
    // this.root = root
    this.setupControls()

    this.root = root
    this.root.mainloop.on('update', () => {
      this.update()

      this.root.mainloop.trigger('updateControls')
    })
  }

  setupControls() {
    this.enableDamping = true
    this.dampingFactor = 0.05
    this.enableZoom = true
    this.enablePan = true
    this.enableKeys = true
    this.screenSpacePanning = true
    this.minDistance = 1
    this.maxDistance = 1000000000
  }
}
