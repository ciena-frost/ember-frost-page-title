import {expect} from 'chai'
import pageTitleFactory from 'ember-frost-page-title/utils/details-page-title-factory'
import {beforeEach, describe, it} from 'mocha'

describe('Unit / utils / details-page-title-factory /', function () {
  let dummyRoute

  beforeEach(function () {
    dummyRoute = {
      pageTitleHandler: pageTitleFactory('name'),

      controller: {
        model: {
          name: 'Details page title'
        },

        selectedTabId: 'some-tab'
      }
    }
  })

  it('should return a function', function () {
    expect(typeof dummyRoute.pageTitleHandler).to.equal('function')
  })

  describe('the generated handler', function () {
    it('should return an array', function () {
      let handlerOutput = dummyRoute.pageTitleHandler([], 'defaultTitle')
      expect(Array.isArray(handlerOutput)).to.equal(true)
    })

    it('should get the data from the model via the modelPath', function () {
      let handlerOutput = dummyRoute.pageTitleHandler([], 'defaultTitle')
      expect(handlerOutput[0]).to.equal('Details page title')
    })

    it('should get the tab name and properly capitalize/de-dasherize it', function () {
      let handlerOutput = dummyRoute.pageTitleHandler([], 'defaultTitle')
      expect(handlerOutput[1]).to.equal('Some tab')
    })
  })
})
