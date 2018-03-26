import Ember from 'ember'
import config from './config/environment'
import loadInitializers from 'ember-load-initializers'
import Resolver from './resolver'

Ember.MODEL_FACTORY_INJECTIONS = true

const {Application} = Ember

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
})

loadInitializers(App, config.modulePrefix)

export default App
