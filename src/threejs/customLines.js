import * as THREE from 'three'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineBasicMaterial, MathUtils } from 'three'

export default class CustomLines extends THREE.Object3D {
  constructor(root) {
    super()
    this.root = root
    this.scene = root.scene
    this.mainloop = root.mainloop

    this.mainloop.on('tick', () => {
      // this.webcamRenderer.update()
      this.updateLines()
    })

    // this.addLine()

    this.addRandomPoints()
    //
  }

  addRandomPoints() {
    const randomPoints = []

    for (let i = 0; i < 8; i++) {
      const x = THREE.MathUtils.randFloat(-5, 5)
      const y = 0
      const z = THREE.MathUtils.randFloat(-5, 5)
      randomPoints.push(x, y, z)
      //add sphere
      const geometry = new THREE.SphereGeometry(0.1, 32, 32)
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(x, y, z)
      // this.scene.add(sphere);
    }
    this.createLine(randomPoints)
  }

  createLine(arrayOfPoints) {
    this.matline = new LineMaterial({
      color: 0xffffff,
      // linewidth: 5, // in pixels
      vertexColors: true,
      //resolution:  // to be set by renderer, eventually
      dashed: false,
      alphaToCoverage: false,
      onBeforeCompile: (shader) => {
        shader.vertexShader = `
        ${shader.vertexShader}
      `.replace(`uniform float linewidth;`, `attribute float linewidth;`)
      }
    })

    let vertices = []
    let colors = []
    let width = []

    for (let i = 0; i < arrayOfPoints.length / 3 - 1; i++) {
      const startPoint = {
        x: arrayOfPoints[i * 3],
        y: arrayOfPoints[i * 3 + 1],
        z: arrayOfPoints[i * 3 + 2]
      }
      const endPoint = {
        x: arrayOfPoints[i * 3 + 3],
        y: arrayOfPoints[i * 3 + 4],
        z: arrayOfPoints[i * 3 + 5]
      }

      const lengthStartPoint = Math.sqrt(
        Math.pow(startPoint.x, 2) +
          Math.pow(startPoint.y, 2) +
          Math.pow(startPoint.z, 2)
      )

      const lengthEndPoint = Math.sqrt(
        Math.pow(endPoint.x, 2) +
          Math.pow(endPoint.y, 2) +
          Math.pow(endPoint.z, 2)
      )

      const distance = Math.sqrt(
        Math.pow(startPoint.x - endPoint.x, 2) +
          Math.pow(startPoint.y - endPoint.y, 2) +
          Math.pow(startPoint.z - endPoint.z, 2)
      )

      const middlePoint = {
        x: (startPoint.x + endPoint.x) / 2,
        y: distance / 2,
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
      geometry.setPositions(tempPoints)

      let colors = []
      let lineWidth = []

      const colorA = new THREE.Color('#8a0000')
      const colorB = new THREE.Color('#ffcc00')

      const chapter = i
      for (let i = 0; i < points.length; i++) {
        const factor = i / points.length
        const colorValueA = lengthStartPoint
        const colorValueB = lengthEndPoint
        let colorValueC = THREE.MathUtils.lerp(colorValueA, colorValueB, factor)

        let weightValue = MathUtils.mapLinear(colorValueC, 0, 10, 0, 1)
        weightValue = MathUtils.smoothstep(weightValue, 0, 1)
        weightValue = 1 - weightValue

        let colorValue = Math.pow(weightValue, 3) * 5

        let newColor = new THREE.Color()
        newColor = newColor.lerpColors(colorA, colorB, colorValue)

        const directDistance = Math.sqrt(
          Math.pow(points[i].x, 2) +
            Math.pow(points[i].y, 2) +
            Math.pow(points[i].z, 2)
        )
        newColor = newColor.lerpColors(colorB, colorA, directDistance / 7)

        newColor = newColor.lerpColors(colorB, colorA, (i + chapter * 50) / 400)

        colors.push(newColor.r, newColor.g, newColor.b) // re
        weightValue = Math.pow(weightValue, 3) * 40
        lineWidth.push(weightValue)
      }

      geometry.setColors(colors)
      geometry.setAttribute(
        'linewidth',
        new THREE.InstancedBufferAttribute(new Float32Array(lineWidth), 1)
      )

      let line = new Line2(geometry, this.matline)
      line.computeLineDistances()
      line.scale.set(1, 1, 1)
      this.scene.add(line)
    }
  }

  addLine() {
    let vertices = []
    let colors = []
    let width = []

    for (let i = 0; i < 128; i++) {
      const cycleValue = i / 128

      const x = Math.sin(cycleValue * Math.PI * 2)
      const y = Math.cos(cycleValue * Math.PI * 2)
      const z = 0
      vertices.push(x, y, z)

      colors.push(cycleValue, cycleValue, cycleValue)
      width.push(cycleValue * 10)
    }

    let geometry = new LineGeometry()
    geometry.setPositions(vertices)
    geometry.setColors(colors)
    geometry.setAttribute(
      'linewidth',
      new THREE.InstancedBufferAttribute(new Float32Array(width), 1)
    )

    this.matline = new LineMaterial({
      color: 0xffffff,
      linewidth: 5, // in pixels
      vertexColors: true,
      //resolution:  // to be set by renderer, eventually
      dashed: false,
      alphaToCoverage: true,
      onBeforeCompile: (shader) => {
        shader.vertexShader = `
        ${shader.vertexShader}
      `.replace(`uniform float linewidth;`, `attribute float linewidth;`)
      }
    })

    let line = new Line2(geometry, this.matline)
    line.computeLineDistances()
    line.scale.set(1, 1, 1)
    this.scene.add(line)
  }

  updateLines() {
    if (this.matline) {
      this.matline.resolution.set(window.innerWidth, window.innerHeight)
    }
  }
}
