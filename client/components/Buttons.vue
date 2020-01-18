<template>
  <div class="buttons">
    <button><p>1</p></button>
    <button><p>2</p></button>
    <button><p>3</p></button>
    <p>...</p>
    <button><p>56</p></button>
    <button><p>>></p></button>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style>
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
