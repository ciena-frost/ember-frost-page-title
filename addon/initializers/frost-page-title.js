/**
 * @overview initializes router with frost-page-title service
 */

import config from 'ember-get-config'

const {APP} = config

export function initialize (application) {
  if (!APP['frost-page-title'] || !APP['frost-page-title'].defaultTitle) {
    return
  }
  application.inject('router', 'frost-page-title', 'service:frost-page-title')
}

export default {
  name: 'frost-page-title',
  initialize
}
