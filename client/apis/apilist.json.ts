import apilist from '~/static/apilist.json'

export type Api = typeof apilist[0]

export interface Methods {
  get: {
    resData: Api[]
  }
}
