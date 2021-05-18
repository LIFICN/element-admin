
<template>
  <div class="app-layout">
    <div class="left"></div>
    <div class="body"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scped>
.app-layout {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  .left {
    width: 200px;
    background-color: lightskyblue;
  }

  .body {
    flex: 1;
    background-color: lightyellow;
    overflow: auto;
  }
}
</style>
