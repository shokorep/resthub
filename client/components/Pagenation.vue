<template>
  <v-pagination v-model="page" :length="15" :total-visible="4"></v-pagination
></template>

<script lang="ts">
export default {}
</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  text-align: center;
}
.buttons button {
  width: 25px;
  height: 25px;
  border-radius: 3px;
}
</style>
