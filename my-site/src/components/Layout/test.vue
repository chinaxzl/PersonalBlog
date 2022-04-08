<template>
  <div class="container">
    <Layout>
      <template #left>
        <div class="left"></div>
      </template>
      <template>
        <div class="main"></div>
      </template>
      <template #right>
        <div class="right"></div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./index.vue";
export default {
  components: {
    Layout,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.container {
    width: 80%;
    height:800px;
    margin: 0 auto;
}
.left {
  width: 250px;
  height: 100%;
  background: red;
}

.main {
  width: 100%;
  height: 100%;
  background: yellow;
}

.right {
  width: 200px;
  height: 100%;
  background: blue;
}
</style>