<template>
  <div class="blog-details-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期：{{ setDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#formcontainer">评论{{ blog.commentNumber }}</a>
      <a>{{ blog.category.name }}</a>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import { setDate } from "@/utils";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },

  methods: {
    setDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.aside {
  font-size: 14px;
  color: @gray;
  span,
  a {
    margin-right:15px ;
  }
}
.markdown-body {
  margin: 2em 0;
}
</style>