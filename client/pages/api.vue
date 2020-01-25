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
      <!-- ここから下をどうグルーピングさせるか課題 -->
      <div v-for="(tag, index) in apiDoc.tags" :key="index">
        {{ tag.name }}
      </div>
      <p v-for="endpoint in endpoints" :key="endpoint">
        {{ endpoint }}
      </p>
    </div>
    <div class="main">
      {{ endpointsGroupByTags }}
      <!-- <p>{{ apiDoc.info.title }}</p>
      <p>{{ apiDoc.info.version }}</p>
      <p style="word-wrap:break-word; white-space:pre-wrap;">
        {{ apiDoc.info.description }}
      </p> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SwaggerParser from 'swagger-parser'
import { OpenAPI, OpenAPIV3 } from 'openapi-types'

@Component({
  async asyncData({ route }) {
    const apiServiceId = route.query.apiServiceId
    const isV3 = (openapi: OpenAPI.Document): openapi is OpenAPIV3.Document =>
      'openapi' in openapi
    const openapi =
      (await SwaggerParser.parse(`/openApiSpec/${apiServiceId}.json`, {
        parse: { json: true }
      })) || {}
    const openapiV3: OpenAPIV3.Document = isV3(openapi)
      ? openapi
      : {
          info: {
            title: '',
            version: '',
            description: ''
          },
          openapi: '3.0.0',
          paths: {},
          components: {},
          tags: [{ name: '', description: '' }]
        }

    return {
      apiDoc: openapiV3,
      endpoints: Object.keys(openapiV3.paths)
    }
  }
})
export default class extends Vue {
  apiDoc!: OpenAPIV3.Document
  endpoints!: string[]

  get endpointsGroupByTags() {
    const tagsInPathObject = Object.entries(this.apiDoc.paths)
      .map((endpoint) => Object.values(endpoint[1]))
      .flat()
      .map((e) => e.tags)
      .flat()

    const tagsInTagsObject = this.apiDoc.tags!.map((e) => e.name) || []

    const uniqueTags = tagsInTagsObject
      .concat(tagsInPathObject)
      .filter((element, index, array) => array.indexOf(element) === index)

    return uniqueTags
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
