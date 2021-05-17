<template>
  <h1>hello,world</h1>

  <el-button icon="el-icon-success" type="primary" @click="count++">
    count is: {{ count }}
  </el-button>

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
a {
  color: #42b983;
}
</style>