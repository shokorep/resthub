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
      <div>Info</div>
      <div>{{ apiDoc.info.title }}</div>
      <div>{{ apiDoc.info.version }}</div>
      <div>{{ apiDoc.info.description }}</div>
      <div>Servers</div>
      <select name="servers">
        <option
          v-for="(server, index) in apiDoc.servers"
          :key="index"
          :value="server.url"
        >
          {{ server.url }}
        </option>
      </select>
      <div v-for="(group, gIndex) in endpointsGroupByTags" :key="gIndex">
        {{ group.tag }}
        <div v-for="(detail, index) in group.pathMethod" :key="index">
          <span>{{ detail.method }}</span>
          <span>{{ detail.path }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// This script don't use TypeScript temporarily.
import { Component, Vue } from 'nuxt-property-decorator'
import SwaggerParser from 'swagger-parser'

@Component({
  async asyncData({ route }) {
    const apiServiceId = route.query.apiServiceId
    const openapi = await SwaggerParser.parse(
      `/openApiSpec/${apiServiceId}.json`,
      {
        parse: { json: true }
      }
    )
    return { apiDoc: openapi }
  }
})
export default class extends Vue {
  apiDoc

  get endpointsGroupByTags() {
    // get UniqueTags
    const tagsInPathObject = Object.entries(this.apiDoc.paths)
      .flatMap((endpoint) => Object.values(endpoint[1]))
      .flatMap((e) => e.tags)
    const tagsInTagsObject = this.apiDoc.tags.map((e) => e.name)
    const mergedAndUniqueTags = tagsInTagsObject
      .concat(tagsInPathObject)
      .filter((element, index, array) => array.indexOf(element) === index)
    // reformat ApiDoc
    const ApiDoc2Arr = Object.entries(this.apiDoc.paths).map((e) => [
      e[0],
      Object.entries(e[1])
    ])
    const apiDocArray = ApiDoc2Arr.map((e) => {
      const objects = e[1].map((elem) => {
        return { path: e[0], method: elem[0], details: elem[1] }
      })
      return objects
    }).flat()
    // sort ApiDoc by path(a->z) and group ApiDoc by UniqueTags
    const newApiDoc = mergedAndUniqueTags.map((tag) => {
      return {
        tag,
        pathMethod: [...apiDocArray]
          .sort((a, b) => {
            const _a = a.path.toString().toLowerCase()
            const _b = b.path.toString().toLowerCase()
            return _a < _b ? -1 : 1
          })
          .filter((element) => element.details.tags.includes(tag))
      }
    })
    return newApiDoc
  }
}
</script>

<style scoped>
.api-container {
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
