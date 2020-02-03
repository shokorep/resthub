<template>
  <div class="api-container">
    {{ flatPathsObj }}
  </div>
</template>

<script>
// This script don't use TypeScript temporarily.
export default {
  props: {
    flatPathsObj: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.api-container {
  margin-top: -1px;
  font-size: 11pt;
  color: #646464;
  border: thin solid #c0c0c0;
}
</style>
