<template>
  <div class="container">
    <v-card>
      <v-card-text v-text="fullname" />
      <v-card-actions>
        <v-btn color="blue" to="/" nuxt outlined v-text="'back'" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { User } from '~/apis/users/_id'

@Component({
  async asyncData({ route }) {
    const userId = +route.query.userId

    return { user: await $nuxt.$api.users._id(userId).$get() }
  }
})
export default class extends Vue {
  user!: User

  get fullname() {
    return `${this.user.lastname} ${this.user.firstname}`
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
