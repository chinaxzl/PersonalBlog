<template>
  <div class="siteAside-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./index.vue";
export default {
  components: {
    SiteAside,
  },
};
</script>

<style scoped>

  .siteAside-container {
    width: 250px;
    height:800px;
    background: #000;
    margin:100px auto;
  }

</style>