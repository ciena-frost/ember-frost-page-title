/* eslint-env node */
/* global require, module */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    babel: {
      optional: ['es7.decorators']
    },
    'ember-cli-babel': {
      includePolyfill: true
    }
  })

  return app.toTree()
}
