<template>
  <div class="api-container">
    <div class="side">
      <v-text-field
        label="Keywords"
        prepend-inner-icon="mdi-magnify"
        single-line
        outlined
        dense
      />
      <p>Info</p>
      <p>Tags</p>
      <p>Servers</p>
      <p>Paths</p>
    </div>
    <div class="main">
      {{ uniqueTags }}
    </div>
  </div>
</template>

<script>
// This script don't use TypeScript temporarily.
import SwaggerParser from 'swagger-parser'

export default {
  async asyncData({ route }) {
    const apiServiceId = route.query.apiServiceId
    const openapi = await SwaggerParser.parse(
      `/openApiSpec/${apiServiceId}.json`,
      {
        parse: { json: true }
      }
    )
    return { apiDoc: openapi }
  },
  data() {
    return {
      apiDoc: {}
    }
  },
  computed: {
    uniqueTags() {
      const tagsInPathsObject = Object.entries(this.apiDoc.paths)
        .flatMap((endpoint) => Object.values(endpoint[1]))
        .flatMap((e) => e.tags)
      const tagsInTagsObject = this.apiDoc.tags.map((e) => e.name)
      // merge and get unique
      return tagsInTagsObject
        .concat(tagsInPathsObject)
        .filter((element, index, array) => array.indexOf(element) === index)
    }
  }
}
</script>

<style scoped>
.container {
  /* Caution: `min-height: 100vh` does not work in IE 11 */
  color: #646464;
  text-align: left;
  background: #fff;
}

.side {
  position: fixed;
  top: 65px;
  left: 0;
  z-index: 1;

  width: 200px;
  height: 100%;
  padding: 30px 20px;
  background: #fff;
  border-right: thin solid #c0c0c0;
}

.main {
  padding: 30px;
  margin: 65px 0 60px 200px;
}
</style>
