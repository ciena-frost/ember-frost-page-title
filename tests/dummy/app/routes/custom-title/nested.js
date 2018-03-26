import Ember from 'ember'
import FrostPageTitleMixin from 'ember-frost-page-title/mixins/frost-page-title'

const {Route} = Ember

export default Route.extend(FrostPageTitleMixin, {
  frostPageTitle (sections, defaultTitle) {
    return sections.map(section => {
      if (section === 'Title') {
        return `(Nested) ${section}`
      }
      return section
    })
  }
})
