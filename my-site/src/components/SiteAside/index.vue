<template>
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar :url="data.avatar" />
      <p class="title">{{ data.siteTitle }}</p>
    </template>

    <Menu />
    <Contact />
    <p class="footer" v-if="data" >{{ data.icp }}</p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Contact from "@/components/SiteAside/Contact";
import Menu from "@/components/SiteAside/Menu";
import { mapState } from "vuex";
export default {
  components: {
    Avatar,
    Contact,
    Menu,
  },

  async created() {
    await this.$store.dispatch("setting/fachsetting");
  },

  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.avatar-container {
  margin: 0 auto;
}

.title {
  color: #fff;
  font-size: 26px;
  text-align: center;
}

.footer {
  text-align: center;
  font-size: 12px;
  color: #ccc;
}
</style>