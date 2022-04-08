<template>
  <div class="contact">
    <Contact />
  </div>
</template>

<script>
import Contact from "./index.vue";
export default {
  components: {
    Contact,
  },
};
</script>

<style scoped>

  .contact {
    width: 250px;
    height:500px;
    background: #000;
    margin:100px auto;
  }

</style>