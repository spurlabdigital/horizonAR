import EventEmitter from '../globals/eventEmitter.js'

export default class Output extends EventEmitter {
  constructor() {
    super()

    this.setCanvas()
    this.init()
  }

  setCanvas() {
    this.parent = document.querySelector('#ThreejsPanel')

    this.canvas = document.createElement('canvas')
    this.canvas.id = 'threejsCanvas'
    this.canvas.style.position = 'absolute'
    this.canvas.style.top = 0
    this.canvas.style.left = 0
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.touchAction = 'none'

    if (!parent) {
      document.body.appendChild(this.canvas)
    } else {
      this.parent.appendChild(this.canvas)
    }
  }

  init() {
    this.updateSize()

    window.addEventListener('resize', () => {
      this.updateSize()
    })

    window.addEventListener('deviceorientation', () => {
      this.updateSize()
    })
  }

  updateSize() {
    const boundingClientRect = this.parent.getBoundingClientRect()
    this.width = boundingClientRect.width
    this.height = boundingClientRect.height
    this.pixelRatio = window.devicePixelRatio
    this.aspect = this.width / this.height
    this.trigger('resize', [
      this.width,
      this.height,
      this.pixelRatio,
      this.aspect
    ])
  }
}
