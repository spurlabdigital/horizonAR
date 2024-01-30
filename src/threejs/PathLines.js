import * as THREE from 'three'
import SinglePath from './SinglePath'
import { useCmsStore } from '../js/cmsStore'
import Numbers from './Numbers'
import { useGlobalState } from '../js/store'
import anime from 'animejs'
import { useRoute, useRouter } from 'vue-router'

export default class PathLines extends THREE.Group {
  constructor(root) {
    super()

    this.root = root

    this.cmsStore = useCmsStore()
    this.globalState = useGlobalState()

    // this.singlePath = new SinglePath(this.root)
    this.addPathLines()
    this.addNumbers()

    this.route = useRoute()

    this.activePerson = null
    if (this.route.name === 'horizon-biography') {
      this.activePerson = this.route.params.id
    }

    this.router = useRouter()
    this.router.beforeEach((to) => {
      if (to.name === 'horizon-biography') {
        this.activePerson = to.params.id
        this.updateLines()
      } else {
        this.activePerson = null
        this.updateLines()
      }
    })

    this.updateLines()

    this.root.deviceHandler.on('updateGeolocation', () => {
      for (const pathKey in this.children) {
        this.children[pathKey].updatePosition()
      }
      this.addPathLines()
      this.updateLines()
    })
  }

  updateLines() {
    if (this.activePerson) {
      this.children.forEach((child) => {
        if (child.name.split('/').pop() === this.activePerson) {
          anime({
            targets: child,
            highlight: 1,
            duration: 500,
            easing: 'easeInOutQuad'
          })
        } else {
          anime({
            targets: child,
            highlight: 0,
            alpha: 0.3,
            duration: 500,
            easing: 'easeInOutQuad'
          })
        }
      })
    } else {
      this.children.forEach((child) => {
        anime({
          targets: child,
          highlight: 0,
          alpha: 1,
          duration: 500,
          easing: 'easeInOutQuad'
        })
      })
    }
  }
  addPathLines() {
    const persons = this.cmsStore.getPersons
    persons.forEach((person) => {
      const singlePath = new SinglePath(this.root, person)
      this.add(singlePath)
    })
  }

  addNumbers() {
    const persons = this.cmsStore.getPersons
    persons.forEach((person) => {
      const numbers = new Numbers(this.root, person)
      this.add(numbers)
    })
  }
}
