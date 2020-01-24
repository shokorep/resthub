<template>
  <div class="container">
    <Header />
    <div class="body">
      <div class="side">
        <p v-for="endpoint in endpoints" :key="endpoint">
          {{ endpoint }}
        </p>
      </div>
      <div class="main">
        <p>{{ apiDoc.info.title }}</p>
        <p>{{ apiDoc.info.version }}</p>
        <p style="word-wrap:break-word; white-space:pre-wrap;">
          {{ apiDoc.info.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SwaggerParser from 'swagger-parser'
import { OpenAPI, OpenAPIV3 } from 'openapi-types'
import Header from '~/components/Header.vue'

@Component({
  components: { Header },

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
          tags: []
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
</style>
