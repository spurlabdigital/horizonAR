import * as THREE from 'three'

export default class Shishi extends THREE.Group {
  constructor() {
    super()

    const segmentCount = 128

    const ringGeometry = new THREE.CylinderGeometry(
      300,
      299,
      1,
      segmentCount,
      1,
      true
    )
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffffff'),
      side: THREE.DoubleSide,
      fog: false
    })
    const cylinder = new THREE.Mesh(ringGeometry, ringMaterial)
    this.add(cylinder)

    this.position.y = 0
    //
    const bowlGeometry = new THREE.SphereGeometry(
      300,
      segmentCount,
      16,
      0,
      Math.PI * 2,
      Math.PI * 0.5,
      Math.PI * 0.5
    )
    const bowlMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#3b3b3b'),
      side: THREE.DoubleSide,
      fog: false,
      transparent: true,
      opacity: 0.6,
      blending: THREE.NormalBlending
    })

    const sphere = new THREE.Mesh(bowlGeometry, bowlMaterial)
    sphere.name = 'bowl'
    this.add(sphere)
  }
}
