/* eslint-disable */
import { AxiosInstance } from 'axios'
import mockServer from 'axios-mock-server'
import mock0 from './users/index'
import mock1 from './users/_id'

export default (client?: AxiosInstance) => mockServer([
  {
    path: '/users',
    methods: mock0
  },
  {
    path: '/users/_id',
    methods: mock1
  }
], client, '')
