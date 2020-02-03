<template>
  <div>
    <v-pagination v-model="page" :length="15" :total-visible="4" />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      page: 1
    }
  }
}
</script>
