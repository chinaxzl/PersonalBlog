<template>
  <div class="menu">
    <Menu />
  </div>
</template>

<script>
import Menu from "./index.vue";
export default {
  components: {
    Menu,
  },
};
</script>

<style scoped>

  .menu {
    width: 250px;
    height:500px;
    background: #000;
    margin:100px auto;
  }

</style>