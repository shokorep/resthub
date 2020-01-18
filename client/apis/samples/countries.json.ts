import countries from '~/static/samples/countries.json'

export type Country = typeof countries[0]

export interface Methods {
  get: {
    resData: Country[]
  }
}
