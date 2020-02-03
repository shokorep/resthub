<template>
  <div class="api-service-container">
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
      <div class="titele-wapper">
        <h1>{{ apiDoc.info.title }}</h1>
        <div>{{ apiDoc.info.version }}</div>
      </div>
      <div class="info-wrapper">
        <h2>Info</h2>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="$md.render(apiDoc.info.description)"></div>
      </div>
      <div class="servers-wrapper">
        <h2>Servers</h2>
        <v-select :items="apiDoc.servers" item-text="url" item-value="url">
        </v-select>
      </div>
      <hr style="background-color:#646464" />
      <div class="api-methods-wapper">
        <div v-for="(group, gIndex) in flatPathsObjGroupsByTag" :key="gIndex">
          <h3 class="api-tag">{{ group.tag }}</h3>
          <div v-for="(flatPathsObj, index) in group.flatPathsObj" :key="index">
            <api-method :flat-paths-obj="flatPathsObj" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// This script don't use TypeScript temporarily.
import SwaggerParser from 'swagger-parser'
import ApiMethod from '~/components/ApiMethod.vue'

export default {
  components: {
    ApiMethod
  },
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
    },
    flatPathsObjGroupsByTag() {
      // reformat PathsObj
      const arrayedPathsObj = Object.entries(this.apiDoc.paths).map((e) => [
        e[0],
        Object.entries(e[1])
      ])
      const flatPathsObj = arrayedPathsObj
        .map((e) => {
          const objects = e[1].map((elem) => {
            return { path: e[0], method: elem[0], opeObj: elem[1] }
          })
          return objects
        })
        .flat()
      // sort ApiDoc by path(a->z) and group ApiDoc by UniqueTags
      const flatPathsObjGroups = this.uniqueTags.map((tag) => {
        return {
          tag,
          flatPathsObj: [...flatPathsObj]
            .filter((element) => element.opeObj.tags.includes(tag))
            .sort((a, b) => {
              const _a = a.path.toString().toLowerCase()
              const _b = b.path.toString().toLowerCase()
              return _a < _b ? -1 : 1
            })
        }
      })
      return flatPathsObjGroups
    }
  }
}
</script>

<style scoped>
.api-service-container {
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
.api-methods-wapper {
  padding: 20px 0;
}

h2 {
  font-size: 28px;
}
h3 {
  font-size: 24px;
}
</style>
