<template>
  <div class="about-container" v-loading="loading || loadingUrl">
    <iframe :src="url" class="about-content" @load="loadingUrl=turl"></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {

  data() {
    return {
      loadingUrl:false,
    }
  },


  computed: {
    ...mapState("about",{
      loading:"loading",
      url:"url"
    }),
  },

  created() {
    this.$store.dispatch("about/getAbout");
  },
};
</script>

<style scoped>
.about-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.about-content {
  width: 100%;
  height: 100%;
}
</style>