import Ember from 'ember'
import config from './config/environment'

const {Router: EmberRouter} = Ember

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('default-title', function () {
    this.route('nested')
  })
  this.route('override-default')

  this.route('custom-title', function () {
    this.route('nested')
  })
})

export default Router
