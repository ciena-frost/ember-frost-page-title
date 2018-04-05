import Ember from 'ember'

const {String: EmberString, get} = Ember

export default function pageTitleFactory (modelPath) {
  return function (sections, defaultTitle) {
    const name = get(this.controller.model, modelPath)
    let tab = get(this.controller, 'selectedTabId')

    if (tab) {
      tab = EmberString.capitalize(tab.replace(/-/g, ' '))
    }

    return [name, tab]
  }
}
