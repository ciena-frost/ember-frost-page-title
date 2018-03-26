/**
 * @overview initializes router instance with willTransition and didTransition
 * hooks for updating the page title
 */

import config from 'ember-get-config'

const {APP} = config

export function initialize (applicationInstance) {
  // fail if no default set for service
  if (!APP['frost-page-title-default']) {
    return
  }

  const router = applicationInstance.lookup('router:main')
  const usedToDidTransition = router.didTransition
  const usedToWillTransition = router.willTransition

  router.willTransition = function (oldInfos, newInfos, transition) {
    // the router handles normal links and link-to helpers a little differently
    // here we try to use the intent.name that comes with a link-to
    // and fallback to intent.url if we don't get that
    let url = transition.intent.name
    if (url) {
      url = url.replace(/\./g, '/')
    } else {
      url = transition.intent.url
    }

    // call previously set willTransition if it exists and is a function
    // this should handle laddering up if it is set
    if (typeof usedToWillTransition === 'function') {
      usedToWillTransition.apply(router, arguments)

    // otherwise ladder just up
    } else {
      this._super(...arguments)
    }

    this.get('frost-page-title').resetSections(url)
  }

  router.didTransition = function () {
    // call previously set didTransition if it exists and is a function
    // this should handle laddering up if it is set
    if (typeof usedToDidTransition === 'function') {
      usedToDidTransition.apply(router, arguments)

    // otherwise ladder just up
    } else {
      this._super(...arguments)
    }

    // set title
    this.get('frost-page-title').updateTitle()
  }
}

export default {
  name: 'frost-page-title',
  initialize: initialize
}
