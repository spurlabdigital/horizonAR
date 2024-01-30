import EventEmitter from './vvv/globals/eventEmitter'
import { useRoute, useRouter } from 'vue-router'

export default class ThreejsStore extends EventEmitter {
  constructor() {
    super()
    this._route = useRoute()
    this.route = this._route.name
    this.parms = this._route.params

    const router = useRouter()
    router.beforeEach((to) => {
      this.route = to.name
      this.parms = to.params
      this.trigger('routeUpdate')
    })

    this.places = []
  }
}
