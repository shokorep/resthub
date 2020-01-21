<template>
  <div class="side-bar">
    <div class="category-title">Category</div>
    <div class="filter-buttons-container">
      <ul class="filter-buttons">
        <li v-for="(item, index) in uniqueCategories" :key="index">
          <input class="checkbox" type="checkbox" name="category" />{{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Api } from '~/apis/apilist.json'

@Component({})
export default class extends Vue {
  @Prop({ type: Array, required: true }) apilist!: Api[]

  get uniqueCategories() {
    return this.apilist
      .map((api) => api.category)
      .flat()
      .filter((element, index, array) => array.indexOf(element) === index)
  }
}
</script>

<style scoped>
.side-bar {
  position: fixed;
  top: 65px;
  left: 0;
  width: 200px;
  height: 100%;
  padding: 30px 20px;
  background: #fff;
  border-right: thin solid #c0c0c0;
}

.category-title {
  margin-bottom: 20px;
  font-size: 14pt;
}

.filter-buttons-container > ul {
  padding: 0;
  list-style: none;
}

.filter-buttons-container > ul li {
  margin: 10px;
  text-align: left;
}

.checkbox {
  margin-right: 10px;
}
</style>
