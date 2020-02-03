<template>
  <div class="search-container">
    <side-bar :apilist="apilist" />
    <div class="contents-area">
      <v-text-field
        v-model="keyword"
        label="Please enter keywords to search APIs"
        placeholder="service: owner:"
        prepend-inner-icon="mdi-magnify"
        single-line
        outlined
        dense
        @blur="search"
        @keyup.enter="search"
      />
      <div class="search-result-header">
        <div class="number-of-hits">
          <span>{{ searchedApilist.length }}</span> apis found
        </div>
        <Pagination />
      </div>
      <div class="search-result-body">
        <div
          v-for="(api, index) in searchedApilist"
          :key="index"
          class="card-wrapper"
        >
          <Card :api="api" />
        </div>
      </div>
      <Pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Api } from '~/apis/apilist.json'
import Pagination from '~/components/Pagination.vue'
import Card from '~/components/Card.vue'
import SideBar from '~/components/SideBar.vue'

@Component({
  components: { Pagination, Card, SideBar },
  async asyncData() {
    return {
      apilist: await $nuxt.$api.apilist_json.$get()
    }
  }
})
export default class extends Vue {
  keyword = ''
  searchKey = ['service:', 'owner:']
  apilist: Api[] = []
  searchedApilist: Api[] = []

  get uniqueCategories() {
    return this.apilist
      .map((api) => api.category)
      .flat()
      .filter((element, index, array) => array.indexOf(element) === index)
  }

  created() {
    this.searchedApilist = this.apilist
  }

  search() {
    const searchWords = { service: '', owner: '' }
    const startService = this.keyword.indexOf(this.searchKey[0])
    const startOwner = this.keyword.indexOf(this.searchKey[1])
    const end = this.keyword.length

    if (startService > -1 && startOwner > -1) {
      if (startService > startOwner) {
        searchWords.service = this.pickWord(startService + 8, end)
        searchWords.owner = this.pickWord(startOwner + 6, startService)
      } else {
        searchWords.owner = this.pickWord(startOwner + 6, end)
        searchWords.service = this.pickWord(startService + 8, startOwner)
      }
    } else if (startService > -1) {
      searchWords.service = this.pickWord(startService + 8, this.keyword.length)
    } else if (startOwner > -1) {
      searchWords.owner = this.pickWord(startOwner + 6, this.keyword.length)
    }

    this.searchedApilist = JSON.parse(JSON.stringify(this.apilist))
    this.searchedApilist = this.searchedApilist.filter((i) => {
      if (
        i.service.match(RegExp(searchWords.service, 'i')) &&
        i.owner.match(RegExp(searchWords.owner, 'i'))
      )
        return i
    })
  }

  pickWord(start: number, end: number) {
    return this.keyword.substring(start, end).trim()
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

.contents-area {
  padding: 30px;
  margin: 65px 0 60px 200px;
}

.search-result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.number-of-hits {
  font-size: 13pt;
  font-weight: 500;
}

.number-of-hits > span {
  margin-right: 3px;
  font-size: 16pt;
}

.search-result-body {
  margin-bottom: 30px;
  box-shadow: 0 2px 5px #c0c0c0;
}

.card-wrapper:nth-child(even) {
  background-color: #f7f7f7;
}

/* atoms */
</style>
