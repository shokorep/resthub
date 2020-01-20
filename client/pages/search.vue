<template>
  <div class="search-container">
    <side-bar :apilist="apilist" />
    <div class="body">
      <div class="main">
        <v-text-field
          label="Please enter keywords to search APIs"
          prepend-inner-icon="mdi-magnify"
          single-line
          outlined
          dense
        ></v-text-field>
        <div class="search-result-header">
          <div class="number-of-hits">345 apis found</div>
          <div><Pagenation /></div>
        </div>
        <div class="search-result-body">
          <div
            v-for="(api, index) in apilist"
            :key="index"
            class="card-wrapper"
          >
            <Card :api="api" />
          </div>
        </div>
        <div class="search-result-footer">
          <Pagenation />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Api } from '~/apis/apilist.json'
import Pagenation from '~/components/Pagenation.vue'
import Card from '~/components/Card.vue'
import SideBar from '~/components/SideBar.vue'

@Component({
  components: { Pagenation, Card, SideBar },
  async asyncData() {
    return {
      apilist: await $nuxt.$api.apilist_json.$get()
    }
  }
})
export default class extends Vue {
  apilist: Api[] = []

  get uniqueCategories() {
    return this.apilist
      .map((api) => api.category)
      .flat()
      .filter((element, index, array) => array.indexOf(element) === index)
  }
}
</script>

<style scoped>
.search-container {
  /* Caution: `min-height: 100vh` does not work in IE 11 */
  color: #646464;
  text-align: left;
  background: #fff;
}

.body {
  display: flex;
  flex-wrap: wrap;
  margin: 65px 0 0 200px;
}

.body .main {
  flex-grow: 1;
  min-width: 400px;
  padding: 30px;
}

.body .main .search-result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.body .main .search-result-header .number-of-hits {
  font-size: 22px;
  font-weight: 500;
}

.search-result-body {
  margin-bottom: 30px;
  box-shadow: 0 2px 5px #c0c0c0;
}

.card-wrapper:nth-child(even) {
  background-color: #f7f7f7;
}

.body .main .search-result-footer {
  margin-bottom: 30px;
}

/* atoms */
</style>
