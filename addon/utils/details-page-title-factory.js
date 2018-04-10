import Ember from 'ember'

const {String: EmberString, get} = Ember

/**
 * factory for a details page title handler
 * will get a dynamic title from a route's controller
 * based on a path to the data in its model
 * @param {string} modelPath - path in model to dynamic title data
 * @param {string} tabIdName - query param name for id of current tab
 * @param {object} model - model from which to get with modelPath
 *   - defaults to route.controller.model
 * @returns {array} - array of title sections
 */
export default function pageTitleFactory (modelPath, tabIdName = 'selectedTabId', model) {
  return function (sections, defaultTitle) {
    model = model || this.controller.model
    const name = get(model, modelPath)
    let tab = get(this.controller, tabIdName)

    if (tab) {
      tab = EmberString.capitalize(tab.replace(/-/g, ' '))
    }

    return [name, tab]
  }
}
