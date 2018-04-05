import Ember from 'ember'

const {String: EmberString, get} = Ember

/**
 * factory for a details page title handler
 * will get a dynamic title from a route's controller
 * based on a path to the data in its model
 * @param {string} modelPath - path in model to dynamic title data
 * @returns {array} - array of title sections
 */
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
