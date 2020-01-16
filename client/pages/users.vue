<template>
  <div class="container">
    <v-card>
      <v-card-text v-text="countryName" />
      <v-card-text
        v-for="user in users"
        :key="user.userId"
        v-text="user.name"
      />
      <v-card-actions>
        <v-btn color="blue" to="/" nuxt outlined v-text="'back'" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Country } from '~/apis/samples/countries.json'
import { User } from '~/apis/samples/users.json'

@Component({
  async asyncData({ route }) {
    const countryId = +route.query.countryId

    return {
      countries: await $nuxt.$api.samples.countries_json.$get(),
      users: (
        (await $nuxt.$api.samples.users_json.$get()).find(
          (u) => u.countryId === countryId
        ) || { users: [] }
      ).users
    }
  }
})
export default class extends Vue {
  countries: Country[] = []
  users: User['users'] = []

  get countryName() {
    const countryId = +this.$route.query.countryId
    return (
      this.countries.find((c) => c.countryId === countryId) || { name: '' }
    ).name
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
