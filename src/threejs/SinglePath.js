import * as THREE from 'three'
import { MathUtils } from 'three'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { Line2 } from 'three/addons/lines/Line2.js'
import customLineVertexShader from './customLineVertexShader.js'

export default class SinglePath extends THREE.Object3D {
  constructor(root, person) {
    super()
    this.root = root
    this.scene = root.scene
    this.rootObject = root.rootObject
    this.mainloop = root.mainloop
    this.marker = root.places.children

    this.name = person.id

    this._alpha = 0
    this._highlight = 0

    this.aktivePerson = person
    this.getStationsPositions()

    this.mainloop.on('update', () => {
      this.updateLines()
    })
  }

  updatePosition() {
    const objectsToRemove = []

    this.root.scene.traverse((child) => {
      if (child.type === 'Line2') {
        // Dispose of geometry and material
        child.geometry.dispose()
        child.material.dispose()

        // Mark object for removal
        objectsToRemove.push(child)
      }
    })
    objectsToRemove.forEach((child) => {
      this.rootObject.remove(child)
    })
  }
  get alpha() {
    return this._alpha
  }

  set alpha(value) {
    this._alpha = value
    this.matline.opacity = value
  }

  get highlight() {
    return this._highlight
  }

  set highlight(value) {
    this._highlight = value
    this.matLinePrepass.uniforms.baseLineFaktor.value = 1 - value
    this.matline.uniforms.baseLineFaktor.value = 1 - value

    if (value === 1) {
      this.renderOrder = 10
    } else {
      this.renderOrder = 0
    }
  }

  getStationsPositions() {
    const stations = this.aktivePerson.stations
    const userData = []

    stations.forEach((station) => {
      const findStationMarker = this.marker.find((marker) => {
        return marker.name === station.location
      })
      if (findStationMarker === undefined) {
        console.error('findStationMarker', station)
      } else {
        userData.push(findStationMarker.userData)
      }
    })

    this.createLine(userData)
  }

  createLine(userData) {
    this.matLinePrepass = new LineMaterial({
      colorWrite: false,
      dashed: false,
      transparent: false,
      depthWrite: true,
      stencilWrite: true,
      stencilRef: 1,
      stencilZPass: THREE.ReplaceStencilOp,
      alphaToCoverage: false,

      onBeforeCompile: (shader) => {
        shader.vertexShader = customLineVertexShader
      }
    })
    this.matLinePrepass.uniforms.baselineWidth = { value: 1 }
    this.matLinePrepass.uniforms.baseLineFaktor = { value: 0 }

    this.matline = new LineMaterial({
      vertexColors: true,
      dashed: false,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      opacity: 1,
      stencilWrite: true,
      alphaToCoverage: false,
      // stencilRef: 0,
      // stencilFunc: THREE.NotEqualStencilFunc,
      // stencilFail: THREE.ReplaceStencilOp,
      // stencilZPass: THREE.ReplaceStencilOp,
      onBeforeCompile: (shader) => {
        shader.vertexShader = customLineVertexShader
      }
    })

    this.matline.uniforms.baselineWidth = { value: 1 }
    this.matline.uniforms.baseLineFaktor = { value: 0 }

    const colorA = new THREE.Color('#ffc532')
    const colorB = new THREE.Color('#8a0000')
    let tempColor = new THREE.Color('#ffffff')

    // Check for doubles
    let userDataShiftDoubles = []

    for (let i = 0; i < userData.length; i++) {
      const activeObject = userData[i]

      const hasDouble = userDataShiftDoubles.find((item) => {
        return item.name === activeObject.name
      })

      const customRotation = hasDouble ? 0.065 : 0

      const tempX = activeObject.position.x
      const x =
        tempX * Math.cos(customRotation) -
        activeObject.position.z * Math.sin(customRotation)
      const z =
        tempX * Math.sin(customRotation) +
        activeObject.position.z * Math.cos(customRotation)

      const tempObject = {
        name: activeObject.name,
        distance: activeObject.distance,
        position: {
          x: x,
          y: activeObject.position.y,
          z: z
        }
      }

      userDataShiftDoubles.push(tempObject)
    }

    for (
      let lineIndex = 0;
      lineIndex < userDataShiftDoubles.length - 1;
      lineIndex++
    ) {
      const startPoint = userDataShiftDoubles[lineIndex].position
      const endPoint = userDataShiftDoubles[lineIndex + 1].position

      const distance = Math.sqrt(
        Math.pow(startPoint.x - endPoint.x, 2) +
          Math.pow(startPoint.y - endPoint.y, 2) +
          Math.pow(startPoint.z - endPoint.z, 2)
      )

      const middlePoint = {
        x: (startPoint.x + endPoint.x) / 2,
        y: (startPoint.y + endPoint.y) / 2 + distance / 2,
        z: (startPoint.z + endPoint.z) / 2
      }

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z),
        new THREE.Vector3(middlePoint.x, middlePoint.y, middlePoint.z),
        new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z)
      )

      const points = curve.getPoints(50)

      let geometry = new LineGeometry()

      const tempPoints = []
      for (let i = 0; i < points.length; i++) {
        tempPoints.push(points[i].x, points[i].y, points[i].z)
      }

      let colors = []
      let lineWidthArray = new Float32Array(50)

      for (let i = 0; i < points.length; i++) {
        //add Sphere

        let startDistance = userDataShiftDoubles[lineIndex].distance
        let endDistance = userDataShiftDoubles[lineIndex + 1].distance

        let factor = i / 50
        const upperEnd = 700
        factor = MathUtils.lerp(startDistance, endDistance, factor)
        factor = MathUtils.clamp(factor, 0, upperEnd)
        factor = MathUtils.mapLinear(factor, 0, upperEnd, 0, 1)

        // Line Width
        let lineWidthFactor = MathUtils.lerp(25, 1, factor)
        lineWidthFactor = MathUtils.clamp(lineWidthFactor, 1, 25)
        lineWidthArray[i] = lineWidthFactor

        tempColor = tempColor.lerpColors(colorA, colorB, factor)
        colors.push(tempColor.r, tempColor.g, tempColor.b)

        // const maxDistance = userDataShiftDoubles.length * 50
        // const distance = i + lineIndex * 50
        // const alpha = MathUtils.mapLinear(distance, 0, maxDistance, 0, 1)
        // tempColor = tempColor.lerpColors(colorA, colorB, alpha)
        // lineWidth[i] = alpha * 40
        // colors.push(tempColor.r, tempColor.g, tempColor.b)
      }

      geometry.setPositions(tempPoints)
      geometry.setColors(colors)
      geometry.setAttribute(
        'vertexLinewidth',
        new THREE.InstancedBufferAttribute(lineWidthArray, 1, false, 1)
      )

      let linePrepass = new Line2(geometry, this.matLinePrepass)
      linePrepass.name = 'HistoryLine'
      linePrepass.computeLineDistances()
      linePrepass.renderOrder = 1
      this.rootObject.add(linePrepass)

      let line = new Line2(geometry, this.matline)
      linePrepass.name = 'HistoryLine'

      line.computeLineDistances()
      line.renderOrder = 10
      this.rootObject.add(line)
    }
  }

  updateLines() {
    if (this.matline) {
      this.matLinePrepass.resolution.set(window.innerWidth, window.innerHeight)
      this.matline.resolution.set(window.innerWidth, window.innerHeight)
    }
  }
}
