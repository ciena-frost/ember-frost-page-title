/**
 * @overview Dynamically overwrites document's title based on a default handler
 * and custom handlers which may be placed on individual routes via the
 * frost-page-title mixin
 */

import Ember from 'ember'
import config from 'ember-get-config'

const {Service, String: EmberString} = Ember
const {APP} = config

export default Service.extend({
  defaultTitle: APP.frostPageTitle.defaultTitle,

  delimiter: APP.frostPageTitle.delimiter,

  _handlers: [],

  /**
   * adds a handler to the _handlers array
   * @param {function} handler - a title handler
   *  - should be bound and saved so that it can be removed
   */
  addHandler (handler) {
    this.get('_handlers').push(handler)
  },

  /**
   * the default title handler
   * @param {string} url - current url, either from the router transition or window.location
   * @returns {array} - array of title sections
   */
  defaultHandler (url = window.location.hash || window.location.pathname) {
    const sections = url.match(/[^/]+/g)

    // return default title if we have no hash to work with
    if (!sections) {
      return []
    }

    // filter and map sections to words
    return sections
      .filter(section => !/[^A-Za-z-]/.test(section))
      .map(section => EmberString.capitalize(section.replace(/-/g, ' ')))
  },

  /**
   * removes a handler from the _handlers array
   * @param {function} handler - a title handler
   *  - should be a reference to a handler added to the array previously
   */
  removeHandler (handler) {
    this.set('_handlers', this.get('_handlers').filter(_handler => handler !== _handler))
  },

  /**
   * updates the title by running the handlers
   * @param {string} url - url to parse with default handler
   */
  updateTitle (url) {
    const defaultTitle = this.get('defaultTitle')
    const handlers = this.get('_handlers')
    const delimiter = this.get('delimiter') || '|'
    const sections = handlers.reduce((acc, handler) => {
      return handler(acc, defaultTitle)
    }, this.defaultHandler(url))
      .filter(section => !!section)

    if (sections.length) {
      document.title = sections.join(` ${delimiter} `)
    } else {
      document.title = defaultTitle
    }
  }
})
