/**
 * @overview Mixin for custom page title handling on any route
 */

import Ember from 'ember'

const {Mixin, inject: {service}} = Ember

export default Mixin.create({
  frostPageTitleService: service('frost-page-title'),

  init () {
    this._super(...arguments)

    // set a bound copy of our title handler if we have one
    if (typeof this.frostPageTitle === 'function') {
      this.set('_frostPageTitle', this.frostPageTitle.bind(this))
    }
  },

  activate () {
    this._super(...arguments)

    const titleService = this.get('frostPageTitleService')

    // if we have a handler, add it to the service's handlers
    if (typeof this._frostPageTitle === 'function') {
      titleService.addHandler(this._frostPageTitle)
    }
  },

  deactivate () {
    this._super(...arguments)

    const titleService = this.get('frostPageTitleService')

    // if we have a handler, remove it from the service's handlers
    if (typeof this._frostPageTitle === 'function') {
      titleService.removeHandler(this._frostPageTitle)
    }
  }
})
