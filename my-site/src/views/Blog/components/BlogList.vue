<template>
  <div class="blog-list-container" v-loading="isLoading" ref="container">
    <ul>
      <li v-for="item in blogtypes.rows" :key="item.id">
        <div class="thumb">
          <RouterLink
            :to="{
              name: 'BlogDetails',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" alt="" title="" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetails',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ setDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'BlogType',
                params: {
                  blogtypeId: item.category.id,
                },
              }"
              >{{ item.category.name }}</RouterLink
            >
          </div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </li>
    </ul>
    <Empty v-if="blogtypes.total < 1 && !isLoading" />
    <!-- 分页放到这里 -->
    <Pager
      :current="getRouteInfo.page"
      :total="blogtypes.total"
      :limit="getRouteInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import { getBlogs } from "@/api/blog";
import Pager from "@/components/Pager";
import { setDate } from "@/utils";
import Empty from "@/components/Empty";
export default {
  components: {
    Pager,
    Empty,
  },

  data() {
    return {
      blogtypes: {},
      isLoading: true,
    };
  },

  async created() {
    this.blogtypes = await getBlogs(
      //请求数据并传入参数
      this.getRouteInfo.page,
      this.getRouteInfo.limit,
      this.getRouteInfo.blogtypeId
    );
    console.log(this.blogtypes);
    this.isLoading = false;
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
    this.$bus.$emit("mainScroll");
  },

  computed: {
    getRouteInfo() {
      //获取地址栏参数
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const blogtypeId = +this.$route.params.blogtypeId || -1;
      return {
        page,
        limit,
        blogtypeId,
      };
    },
  },

  methods: {
    setDate,
    handlePageChange(newPage) {
      //点击分页组件后改变地址栏参数
      if (this.getRouteInfo.blogtypeId === -1) {
        this.$router.push({
          name: "Blog",
          query: {
            page: newPage,
            limit: this.getRouteInfo.limit,
          },
        });
      } else {
        this.$router.push({
          name: "BlogType",
          query: {
            page: newPage,
            limit: this.getRouteInfo.limit,
          },
          params: {
            blogtypeId: this.getRouteInfo.blogtypeId,
          },
        });
      }
    },

    handleScroll() {
      //运行事件，传入运动dom
      this.$bus.$emit("mainScroll", this.$refs.container);
    },

    setMainScroll(scrollTop) {
      this.$refs.container.scrollTop = scrollTop;
    },
  },

  watch: {
    //监听某些数据变化时执行
    async $route() {
      //route数据改变执行以下代码
      this.isLoading = true;
      this.$refs.container.scrollTop = 0;
      this.blogtypes = await getBlogs();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  box-sizing: border-box;
  line-height: 1.7;
  scroll-behavior: smooth; //滚轮丝滑
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    margin-right: 20px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
}

h2 {
  margin: 0;
}

.aside {
  font-size: 12px;
  color: @gray;
  span {
    margin-right: 20px;
  }
}

.desc {
  margin: 15px 0;
  font-size: 14px;
}
</style>
