/* eslint-env node */
'use strict'

module.exports = {
  name: 'ember-frost-page-title',

  /**
   * sets the default page title on build
   * @param {string} type - type of content in which to be included
   * @param {object} config - the app config object
   * @returns {string|undefined} - string for content
   */
  contentFor: function (type, config) {
    // fail if we don't have a default for frost-page-title in the config
    if (!config.APP || !config.APP['frost-page-title-default']) {
      return
    }

    // insert default page title
    if (type === 'page-title') {
      return config.APP['frost-page-title-default']
    }
  }
}
