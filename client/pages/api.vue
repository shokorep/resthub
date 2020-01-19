<template>
  <div class="container">
    <Header />
    <div class="body">
      <div class="side"></div>
      <div class="main"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { ApiDoc } from '~/apis/apidocs.json'
import Header from '~/components/Header.vue'

@Component({
  components: { Header },

  async asyncData({ route }) {
    const apiServiceId = route.query.apiServiceId

    return {
      apiDoc: (
        (await $nuxt.$api.apidocs_json.$get()).find(
          (apiDoc) => apiDoc.apiServiceId === apiServiceId
        ) || { apiDoc: [] }
      ).apiDocument
    }
  }
})
export default class extends Vue {}
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
</style>
