import users from '~/static/samples/users.json'

export type User = typeof users[0]

export interface Methods {
  get: {
    resData: User[]
  }
}
