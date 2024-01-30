import GUI from 'lil-gui'

export default class Debug extends GUI {
  constructor(rootPatch) {
    super(rootPatch)

    this.root = rootPatch

    rootPatch.output.on('resize', (width, height) => {
      // console.log('resize ', width, height)
    })

    this.quickPreset = null

    const exportSettings = this.addFolder('Gloabl Settings')

    exportSettings.add(this, 'quicksave').name('Quick Save')
    exportSettings.add(this, 'quickload').name('Quick Load')
    exportSettings.add(this, 'export').name('Export')
    exportSettings.close()
    this.close()
    // this.restore()
    this.hide()
  }

  restore() {
    const data = JSON.parse(localStorage.getItem('quickPreset'))
    if (data) {
      setTimeout(() => {
        this.load(data)
      }, 16)
    }
  }
  quicksave() {
    this.quickPreset = this.save()
    localStorage.setItem('quickPreset', JSON.stringify(this.quickPreset))
  }

  import() {
    const importValues = JSON.parse(window.prompt('Paste your JSON here'))
    this.load(importValues)
  }

  export() {
    const exportValues = JSON.stringify(this.save())
    navigator.clipboard.writeText(exportValues)
  }

  quickload() {
    const data = JSON.parse(localStorage.getItem('quickPreset'))
    this.load(data)
  }
  reset() {
    this.reset()
  }
}
