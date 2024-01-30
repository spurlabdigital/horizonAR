import * as THREE from 'three'

export default class Camera extends THREE.PerspectiveCamera {
  constructor(root) {
    super()
    this.root = root
    this.output = this.root.output

    this.setupCamera()
    this.root.output.on('resize', () => this.resize())
  }

  setupCamera() {
    this.fov = 77
    this.aspect = this.output.width / this.output.height
    this.near = 0.1
    this.far = 10000
    this.position.z = 5
    this.updateProjectionMatrix()
  }

  resize() {
    this.aspect = this.output.width / this.output.height
    if(this.aspect < 1) {
      this.fov = 77
    } else {
      this.fov = 35
    }
    this.updateProjectionMatrix()
  }
}
