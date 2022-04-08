<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="handleData" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import { getBlogTypes } from "@/api/blog";
export default {
  components: {
    RightList,
  },

  data() {
    return {
      blogtypes: [],
      isLoading: true,
    };
  },

  async created() {
    this.blogtypes = await getBlogTypes();
    this.isLoading = false;
  },

  computed: {
    getRouteInfo() {//获取网页url地址
      const blogtypeId = +this.$route.params.blogtypeId || -1;
      const limit = +this.$route.query.limit || 10;
      return {
        blogtypeId,
        limit,
      };
    },

    handleData() {//修改请求的数据
      if (this.blogtypes.length < 1) {
        return;
      }
      const totalData = this.blogtypes.reduce((a, b) => a + b.articleCount, 0); //算出数据总数
      const relut = [ //得到新的数据，并且加入总数据
        { name: "全部", id: -1, articleCount: totalData },
        ...this.blogtypes,
      ];
      return relut.map((it) => ({//展开所有数据加入isSelected属性，并且判断true或false
        ...it,
        isSelected: it.id === this.getRouteInfo.blogtypeId,
      }));
    },
  },

  methods: {
    handleSelect(newPage) {//点击RightList组件处理事件
      //点击分页组件后改变地址栏参数
      if (newPage.id === -1) {//当返回的参数为-1时，这时候为全部
        this.$router.push({
          name: "Blog",
          query: {
            page: 1,
            limit: this.getRouteInfo.limit,
          },
        });
      } else {//返回的参数补位-1时，则有分类
        this.$router.push({
          name: "BlogType",
          query: {
            page: 1,
            limit: this.getRouteInfo.limit,
          },
          params: {
            blogtypeId: newPage.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  h2 {
    margin: 0;
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>