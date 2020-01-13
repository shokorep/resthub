import { MockMethods } from 'axios-mock-server'
import { users } from './index'

export interface User {
  id: number
  firstname: string
  lastname: string
}

const methods: MockMethods = {
  get: ({ values }) => [200, users.find((user) => user.id === values.id)]
}

export interface Methods {
  get: {
    resData: User
  }
}

export default methods
