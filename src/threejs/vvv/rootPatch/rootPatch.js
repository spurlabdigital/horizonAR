import * as THREE from 'three'
import MainLoop from './MainLoop.js'
import Output from './Output.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Controls from './Controls.js'
import Debug from './Debug.js'

export default class RootPatch {
  constructor() {
    this.scene = new THREE.Scene()
    this.mainloop = new MainLoop(this)
    this.output = new Output(this)
    this.camera = new Camera(this)
    this.controls = new Controls(this)
    this.renderer = new Renderer(this)

    // this.helper = new THREE.Group()
    // this.helper.add(new THREE.AxesHelper(100))
    // this.helper.add(new THREE.GridHelper(1000, 100))
    // this.scene.add(this.helper)

    this.debug = new Debug(this)
  }
}
