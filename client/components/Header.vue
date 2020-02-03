<template>
  <div class="header">
    <div class="app-name">RESThub</div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;
  padding: 0 20px;
  background: #234fa7;
  box-shadow: 0 2px 5px #c0c0c0;
}

.header .app-name {
  font-size: 30px;
  color: #fff;
}
</style>
