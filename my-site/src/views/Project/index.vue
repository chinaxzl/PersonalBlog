<template>
  <div class="project-container" ref="container">
    <div class="project-item" v-for="item in data" :key="item.id">
      <a
        :href="
          item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
        "
        :target="item.url ? '_blank' : '_self'"
      >
        <img v-lazy="item.thumb" alt="" class="thumb" />
      </a>
      <div class="info">
        <h2>
          <a
            :href="
              item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
            "
            :target="item.url ? '_blank' : '_self'"
            >{{ item.name }}</a
          >
        </h2>
        <a class="github" target="_blank" :href="item.github" v-if="item.github"
          >github</a
        >
        <p v-for="(desc, i) in item.description" :key="i">{{ desc }}</p>
      </div>
    </div>
    <Empty v-if="data.length === 0 && !loading" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Empty from "@/components/Empty";
export default {

  components: {
    Empty
  },

  computed: {
    ...mapState("project", ["loading", "data"]),
  },

  created() {
    this.$store.dispatch("project/getProject");
  },

  mounted() {
    //注册事件
    this.$refs.container.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("setMainScroll", this.setMainScroll);
  },
  beforeDestroy() {
    //删除事件
    this.$refs.container.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("setMainScroll", this.setMainScroll);
    this.$bus.$emit("mainScroll", undefined);
  },

  methods: {
    handleScroll() {
      //运行事件，传入运动dom
      this.$bus.$emit("mainScroll", this.$refs.container);
    },
    setMainScroll(scrollTop) {
      this.$refs.container.scrollTop = scrollTop;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.project-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.project-item {
  display: flex;
  padding: 20px;
  transition: 0.5s;
  margin-bottom: 20px;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
  }
}

.thumb {
  width: 250px;
  min-height: 150px;
  flex: 0 0 auto;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
}

.info {
  line-height: 1.7;
  flex: 1 1 auto;
  h2 {
    margin: 0;
  }
}
.github {
  font-size: 14px;
  color: @primary;
}
</style>