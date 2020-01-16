import Vuex from 'vuex'
import {
  createModule,
  mutation,
  action,
  extractVuexModule,
  createProxy
} from 'vuex-class-component'
import { Country } from '~/apis/samples/countries.json'

const VuexModule = createModule({ namespaced: 'countries', target: 'nuxt' })

export class CountryStore extends VuexModule {
  countries: Country[] = []

  get country() {
    return (countryId: number) =>
      this.countries.find((c) => c.countryId === countryId)
  }

  @mutation setCountries(countries: Country[]) {
    this.countries = countries
  }

  @action async fetchCountries() {
    this.setCountries(await $nuxt.$api.samples.countries_json.$get())
  }
}

export const store = new Vuex.Store({
  modules: { ...extractVuexModule(CountryStore) }
})

export default createProxy(store, CountryStore)
