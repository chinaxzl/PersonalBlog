<template>
  <Layout>
    <div class="main-container" v-loading="isLoading" ref="container">
      <BlogDetails :blog="blogs" v-if="blogs" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogToc :list="blogs.toc" v-if="blogs" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogDetails from "./components/BlogDetails";
import BlogToc from "./components/BlogToc";
import { getBlog } from "@/api/blog";
import BlogComment from "./components/BlogComment";
import {setTitle} from "@/utils"
export default {
  components: {
    Layout,
    BlogDetails,
    BlogToc,
    BlogComment,
  },

  data() {
    return {
      blogs: null,
      isLoading: true,
    };
  },

  async created() {
    this.blogs = await getBlog(this.$route.params.id);
    this.isLoading = false;
    setTitle.setRouterTitle(this.blogs.title)
  },

  updated() {//数据改变时，修改hash值从而实现刷新页面跳转到目标位置
    const hash = location.hash;
    location.hash = "";
    setTimeout(()=>{
      location.hash =hash;
    },50)
  },

  mounted() {//注册事件
    this.$refs.container.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("setMainScroll",this.setMainScroll);
  },
  beforeDestroy() {//删除事件
    this.$refs.container.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("setMainScroll",this.setMainScroll);
     this.$bus.$emit("mainScroll",undefined);
  },

  methods: {
    handleScroll() {//运行事件，传入运动dom
      this.$bus.$emit("mainScroll", this.$refs.container);
    },

    setMainScroll(scrollTop){
      this.$refs.container.scrollTop = scrollTop;
    }
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>