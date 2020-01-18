<template>
  <div class="container">
    <Header />
    <div class="body">
      <div class="side">
        <ul>
          <p class="category-title">Category</p>
          <li v-for="(item, index) in uniqueCategories" :key="index">
            <input type="checkbox" name="category" />{{ item }}
          </li>
        </ul>
      </div>
      <div class="main">
        <div class="search-box">
          <input
            class="inputtext"
            type="text"
            placeholder="Please enter keywords to search APIs"
          />
          <input class="submit" type="submit" value="Search" />
        </div>
        <div class="search-result-header">
          <p class="number-of-hits">345 apis found</p>
          <Buttons />
        </div>
        <div class="search-result-body">
          <div v-for="(api, index) in apilist" :key="index" class="card">
            <Card :api="api" />
          </div>
        </div>
        <div class="search-result-footer">
          <Buttons />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Api } from '~/apis/apilist.json'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Buttons from '~/components/Buttons.vue'
import Card from '~/components/Card.vue'

@Component({
  components: { Header, Footer, Buttons, Card },
  async asyncData() {
    return {
      apilist: await $nuxt.$api.apilist_json.$get()
    }
  }
})
export default class extends Vue {
  apilist: Api[] = []
  categories: string[] = []

  get uniqueCategories() {
    return this.apilist
      .map((api) => api.category)
      .flat()
      .filter((element, index, array) => array.indexOf(element) === index)
  }
}
</script>

<style scoped>
.container {
  /* Caution: `min-height: 100vh` does not work in IE 11 */
  height: 100vh;
  margin: 0 auto;
  color: #646464;
  text-align: left;
}

.body {
  display: flex;
  flex-wrap: wrap;
}

.body .side {
  min-width: 200px;
  padding: 100px 20px;
  border-right: thin solid;
  border-right-color: #c0c0c0;
}
.body .main {
  flex-grow: 1;
  min-width: 400px;
  padding: 30px;
}

.body .side > ul {
  padding: 0;
  list-style: none;
}
.body .side > ul li {
  margin: 10px;
  text-align: left;
}

.body .main .search-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 50px 0;
}
.body .main .search-result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* .body .main .search-result-body {
} */

.body .main .search-result-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* search-result-body */
.card {
  display: flex;

  padding: 10px 20px;
  margin-bottom: 1px;
  background: #fff;

  border: thin solid;
  border-color: #c0c0c0;
  box-shadow: 0 2px 5px #a9a9a9;
}
.card:nth-child(even) {
  background-color: #f7f7f7;
}

/* atoms */
input {
  font-size: 11pt;
}

.inputtext {
  width: 80%;
  height: 40px;

  border: thin solid;
  border-color: #c0c0c0;
  border-radius: 5px;
  box-shadow: 0 2px 2px #dcdcdc;
}
.submit {
  width: 80px;
  height: 40px;

  margin-left: 10px;
  color: #fff;
  background-color: #5d5d5d;

  border: thin solid;
  border-color: #c0c0c0;
  border-radius: 8px;
}
</style>
