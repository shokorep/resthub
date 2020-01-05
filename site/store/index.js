import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    state: {
      counter: 0,
      apilists: [
        {
          apiName: 'test1 API',
          owner: 'AAA.Inc',
          category: ['example1', 'example2', 'example3']
        },
        {
          apiName: 'test2 API',
          owner: 'BBB.Inc',
          category: ['example1', 'example4', 'example5']
        },
        {
          apiName: 'test3 API',
          owner: 'CCC.Inc',
          category: ['example1', 'example2', 'example6']
        },
        {
          apiName: 'test4 API',
          owner: 'DDD.Inc',
          category: ['example1', 'example4', 'example7']
        }
      ],
      categories: []
    },
    mutations: {
      setCategories(state) {
        console.log('hoge')
        const notUniqueCategories = []
        state.apilists.forEach((api) => {
          notUniqueCategories.push(api.category)
        })
        const categories = notUniqueCategories
          .flat()
          .filter((element, index, array) => array.indexOf(element) === index)
        console.log(categories)
        state.categories = categories
      }
    }
  })
