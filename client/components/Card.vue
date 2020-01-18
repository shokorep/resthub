<template>
  <div>
    <div class="api-items-left">
      <div class="api-header">
        <div class="logo">
          <img :src="api.icon" alt="" />
        </div>
        <div class="apiname">{{ api.apiName }}</div>
      </div>
      <div class="api-discription">
        {{ api.discription }}
      </div>
      <div class="api-category">
        <span v-for="category in api.category" :key="category">
          {{ category }}
        </span>
      </div>
      <div class="api-footer">
        <span class="owner">{{ api.owner }}</span>
        <span>updated: {{ api.updated }}</span>
      </div>
    </div>
    <div class="api-items-right">
      <!-- {{ api.numberof downloads }} -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Api } from '~/apis/apilist.json'

@Component({})
export default class extends Vue {
  @Prop({ type: Object, required: true }) api!: Api
}
</script>

<style scoped>
.api-items-left {
  flex-grow: 1;
}
.api-items-right {
  width: 100px;
}
.api-items-left > div {
  margin: 15px 0;
}
.api-header {
  display: flex;
  align-items: flex-end;
  justify-content: left;
  font-size: 16pt;
}
.api-header > .logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  text-align: right;
}
.api-header > .logo > img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.api-category > span {
  display: inline;
  padding: 0 5px;
  margin-right: 5px;
  font-size: 10pt;
  color: #fff;
  background-color: #628bdd;
  border-radius: 2pt;
}
.api-footer > span {
  margin-right: 20px;
}
.api-footer > .owner {
  font-size: 14pt;
}
</style>
