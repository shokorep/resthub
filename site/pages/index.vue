<template>
  <div class="container">
    <div class="header">
      <div>
        <h1>RestHub</h1>
      </div>
      <div class="form">
        <input class="inputtext" type="text" placeholder="Search public APIs" />
        <input class="submit" type="submit" value="Search" />
      </div>
    </div>
    <div class="category">
      <ul>
        <li v-for="item in categories" :key="item">
          <input type="checkbox" name="category" />{{ item }}
        </li>
      </ul>
    </div>
    <div class="apilists">
      <div v-for="item in apilist" :key="item" class="card">
        <h1 class="apiname">{{ item.apiName }}</h1>
        <h2 class="owner">{{ item.owner }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

const apilists = [
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
]

@Component
export default class extends Vue {
  apilist = apilists
  categories: string[] = []

  getUniqueCategories(apilist: typeof apilists) {
    const notUniqueCategories: string[][] = []
    apilist.forEach((api) => {
      notUniqueCategories.push(api.category)
    })
    const categories: string[] = notUniqueCategories
      .flat()
      .filter((element, index, array) => array.indexOf(element) === index)
    return categories
  }

  mounted() {
    this.categories = this.getUniqueCategories(this.apilist)
  }
}
</script>

<style scoped>
/* autoprefixer grid: no-autoplace */
.inputtext {
  width: 80%;
  height: 50px;
  border-radius: 5px;
}

.submit {
  width: 70px;
  height: 50px;
  border-radius: 5px;
}

.card {
  /* width: 350px; */
  margin: 5px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.container {
  display: grid;

  /* Caution: `min-height: 100vh` does not work in IE 11 */
  height: 100vh;
  margin: 0 auto;
  text-align: center;

  /* Caution: `1fr` has different results in IE 11 */
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

.header {
  grid-column: 1 / 4;
  grid-row: 1 / 2;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.header > h1 {
  grid-column: 1 / 4;
  grid-row: 2 / 3;
  width: 100%;
}

.form {
  grid-column: 2 / 4;
  grid-row: 2 / 3;
}

.category {
  grid-column: 1 / 2;
  grid-row: 2 / 7;
}

.apilists {
  grid-column: 2 / 4;
  grid-row: 2 / 7;
}

ul {
  list-style: none;
}

li {
  text-align: left;
}

input {
  font-size: 11pt;
}
</style>
