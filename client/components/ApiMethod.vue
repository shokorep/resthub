<template>
  <!-- コンテナ自体のv-showを制御する必要有り。 -->
  <div class="api-container">
    <div class="api-title">
      <h5 v-if="pathsobj.method" :class="[pathsobj.method, 'method']">
        {{ pathsobj.method }}
      </h5>
      <h4 class="api-path">
        {{ pathsobj.path }}
      </h4>
      <p v-if="existsKey(pathsobj.opeObj, 'summary')" class="summary">
        {{ pathsobj.opeObj.summary }}
      </p>
    </div>
    <div class="api-detail">
      <div v-if="existsKey(pathsobj.opeObj, 'description')" class="description">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="$md.render(pathsobj.opeObj.description)" />
      </div>
      <div v-if="existsKey(pathsobj.opeObj, 'parameters')">
        <h5>Parameters</h5>
        <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
          <tr
            v-for="(parameter, index) in pathsobj.opeObj.parameters"
            :key="index"
          >
            <td>
              <p>{{ parameter.name }}</p>
              <p>{{ parameter.in }}</p>
              <span v-if="parameter.required">* requierd</span>
            </td>
            <td>
              <v-text-field
                v-if="
                  parameter.schema.type === 'string' &&
                    !Object.keys(parameter.schema).includes('enum')
                "
                single-line
                outlined
                dense
              />
              <div v-if="parameter.schema.type === 'boolean'">
                <v-select :items="[true, false]" dense outlined></v-select>
              </div>
              <div v-if="Object.keys(parameter.schema).includes('enum')">
                <v-select
                  :items="parameter.schema.enum"
                  dense
                  outlined
                  return-object
                ></v-select>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-if="existsKey(pathsobj.opeObj, 'requestBody')">
        <h5>RequestBody</h5>
        <!-- <v-select :items="[...requestBody[0][0]]" dense outlined></v-select> -->
        <div class="contents"></div>
        <div class="appjson"></div>
        {{ pathsobj.opeObj.requestBody }}
      </div>
      <div v-if="existsKey(pathsobj.opeObj, 'responses')">
        <h5>Responses</h5>
        <table>
          <tr>
            <th>Code</th>
            <th>Description</th>
          </tr>
          <tr v-for="(response, index) in responses" :key="index">
            <td>{{ response[0] }}</td>
            <td>
              <p>{{ response[1].description }}</p>
              <div v-if="existsKey(response[1], 'content')">
                <v-select
                  v-model="selectedMediaType"
                  :items="entiry(response[1].content)"
                  item-text="key"
                  item-value="value"
                  dense
                  outlined
                ></v-select>
                {{ selectedMediaType }}
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// This script don't use TypeScript temporarily.
export default {
  props: {
    pathsobj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedMediaType: ''
    }
  },
  computed: {
    RequestBody() {
      const content = Object.entries(this.pathsobj.opeObj.requestBody.content)
      return content
    },
    responses() {
      const flatResponses = Object.entries(this.pathsobj.opeObj.responses)
      const sortedResposes = [...flatResponses].sort((a, b) => {
        const _a = a[0].toString().toLowerCase()
        const _b = b[0].toString().toLowerCase()
        return _a < _b ? -1 : 1
      })
      return sortedResposes
    }
  },
  // mounted() {
  // },
  methods: {
    existsKey: (obj, key) => {
      // console.log(Object.keys(obj).includes(key))
      return Object.keys(obj).includes(key)
    },
    entiry: (contentObj) => {
      const obj = Object.entries(contentObj).map((e) => {
        return { key: e[0], value: e[1] }
      })
      return obj
    }
  }
}
</script>

<style scoped>
.api-container {
  /* Caution: `min-height: 100vh` does not work in IE 11 */

  /* padding: 5px 20px; */
  font-size: 11pt;
  color: #646464;
  border: thin solid #c0c0c0;
  border-bottom: 0;
}

.api-title {
  display: flex;
  flex-direction: row;
  padding: 5px 20px;
  border-bottom: thin solid #c0c0c0;
}
.api-detail {
  padding: 5px 20px;
}
.api-path {
  padding: 2px;
  line-height: 100%;
}
.method {
  width: 50px;
  padding: 2px;
  line-height: 100%;
  text-align: center;
  border-radius: 5px;
}
.get {
  background-color: #5c81ff;
}
.post {
  background-color: #5bc45b;
}
.put {
  background-color: #ff9c38;
}
.delete {
  background-color: #ffadad;
}
</style>
