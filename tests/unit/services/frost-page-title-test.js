import {expect} from 'chai'
import {service} from 'ember-test-utils/test-support/setup-test'
import {afterEach, beforeEach, describe, it} from 'mocha'

const test = service('frost-page-title')

describe(test.label, function () {
  let service

  test.setup()

  beforeEach(function () {
    service = this.subject()
    service.set('_handlers', [])
  })

  afterEach(function () {
    window.location.hash = ''
    service.updateTitle()
  })

  it('should start with an empty _handlers array', function () {
    expect(service.get('_handlers')).to.eql([])
  })

  describe('update', function () {
    it('should use default title when _handlers is empty and url has no useable sections', function () {
      service.updateTitle('/')
      expect(document.title).to.equal('ember-frost-page-title tests')
    })

    it('should use values from _handlers if not empty', function () {
      service.set('_handlers', [() => ['Foo']])
      service.updateTitle()
      expect(document.title).to.equal('Foo')
    })

    it('should join values with " | "', function () {
      service.set('_handlers', [() => ['Foo', 'Bar']])
      service.updateTitle()
      expect(document.title).to.equal('Foo | Bar')
    })
  })

  describe('defaultHandler', function () {
    it('should return capitalized version of words from window.location.hash', function () {
      window.location.hash = '/foo-bar'
      expect(service.defaultHandler()).to.eql(['Foo Bar'])
    })

    it('should ignore non-wordy things', function () {
      window.location.hash = '/foo/123/bar'
      expect(service.defaultHandler()).to.eql(['Foo', 'Bar'])
    })
  })
})
