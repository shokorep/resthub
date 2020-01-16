<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt-ts
      </h1>
      <h2 class="subtitle">
        Swell RESThub project
      </h2>
      <div v-for="country in countries" :key="country.countryId">
        <v-btn
          class="my-1 white--text"
          color="blue"
          :to="`/users?countryId=${country.countryId}`"
          nuxt
          v-text="country.name"
        >
        </v-btn>
      </div>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/atoms/Logo.vue'

@Component({
  components: { Logo },
  async fetch() {
    await $nuxt.$vxm.countries.fetchCountries()
  }
})
export default class extends Vue {
  get countries() {
    return this.$vxm.countries.countries
  }
}
</script>

<style scoped>
/* autoprefixer grid: no-autoplace */
.container {
  display: grid;

  /* Caution: `min-height: 100vh` does not work in IE 11 */
  height: 100vh;
  margin: 0 auto;
  text-align: center;

  /* Caution: `1fr` has different results in IE 11 */
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.container > div {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

.title {
  font-size: 100px;
  font-weight: 300;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  padding-bottom: 15px;
  font-size: 42px;
  font-weight: 300;
  color: #526488;
  word-spacing: 5px;
}

.links {
  padding-top: 15px;
}

.button--green {
  display: inline-block;
  padding: 10px 30px;
  color: #3b8070;
  text-decoration: none;
  border: 1px solid;
  border-radius: 4px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  padding: 10px 30px;
  margin-left: 15px;
  color: #35495e;
  text-decoration: none;
  border: 1px solid;
  border-radius: 4px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
