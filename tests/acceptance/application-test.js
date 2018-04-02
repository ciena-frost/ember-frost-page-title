import {expect} from 'chai'
import {after, before, beforeEach, describe, it} from 'mocha'

import destroyApp from '../helpers/destroy-app'
import startApp from '../helpers/start-app'

describe('Acceptance: Application', function () {
  let application

  this.timeout(5000)

  before(function () {
    application = startApp()
  })

  after(function () {
    destroyApp(application)
    application = null
  })

  describe('visit /', function () {
    beforeEach(function () {
      return visit('/')
    })

    it('should have default title provided by frost-page-title', function () {
      expect(/ember-frost-page-title tests/.test(document.title)).to.eql(true)
    })
  })

  ;[
    ['custom-title', 'Hello | Custom | Title'],
    ['custom-title/nested', 'Hello | Custom | (Nested) Title'],
    ['default-title', 'Default title'],
    ['default-title/nested', 'Default title | Nested']
  ]
    .forEach(([path, title]) => {
      describe(`visit /${path}`, function () {
        beforeEach(function () {
          return visit(`/${path}`)
        })

        it(`should write correct title for path: ${path}`, function () {
          expect(document.title).to.eql(title)
        })
      })
    })
})
