import EventEmitter from './eventEmitter'

export default class StoreHandler extends EventEmitter {
  constructor(props) {
    super(props)
    this.root = props

    this.startRoute = this.root.store.state.activeRoute

    this.root.store.subscribe((mutation) => {
      this.trigger(mutation.type, [mutation.payload])
    })
  }
}
