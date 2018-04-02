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
    if (typeof this.pageTitleHandler === 'function') {
      this.set('_pageTitleHandler', this.pageTitleHandler.bind(this))
    }
  },

  activate () {
    this._super(...arguments)

    const titleService = this.get('frostPageTitleService')

    // if we have a handler, add it to the service's handlers
    if (typeof this._pageTitleHandler === 'function') {
      titleService.addHandler(this._pageTitleHandler)
    }
  },

  deactivate () {
    this._super(...arguments)

    const titleService = this.get('frostPageTitleService')

    // if we have a handler, remove it from the service's handlers
    if (typeof this._pageTitleHandler === 'function') {
      titleService.removeHandler(this._pageTitleHandler)
    }
  }
})
