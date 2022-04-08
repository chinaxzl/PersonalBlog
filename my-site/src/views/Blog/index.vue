<template>
  <div class="about-container">
      <Layout>
        <BlogList />
        <template #right>
          <BlogCategory />
        </template>
      </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./components/BlogList";
import BlogCategory from "./components/BlogCategory";
export default {
  components: {
    Layout,
    BlogList,
    BlogCategory
  }
}
</script>

<style scoped lang="less">
.about-container{
  width: 100%;
  height: 100%;
}

</style>