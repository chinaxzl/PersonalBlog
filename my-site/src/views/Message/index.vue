<template>
  <div class="about-container" ref="container">
    <MessageArea
      :isListLoading="loading"
      @submit="handleSubmit"
      :list="data.rows"
      title="评论数"
      :subTitle="`(${data.total ? data.total : 0})`"
      v-if="data"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import * as msgApi from "@/api/message";
export default {
  components: {
    MessageArea,
  },

  data() {
    return {
      data: {},
      loading: true,
      limit: 10,
      page: 1,
    };
  },

  async created() {
    this.data = await msgApi.getMessages(this.page, this.limit);
    this.loading = false;
  },

  methods: {
    async handleSubmit(item, callback) {
      const resp = await msgApi.postMessages({
        nickName: item.nickName,
        nickContent: item.nickContent,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("评论成功");
    },

    async addDom() {
      if (this.data.rows.length >= this.data.total) {
        return;
      }
      this.loading = true;
      this.page++;
      const resp = await msgApi.getMessages(this.page, this.limit);
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.loading = false;
    },

    handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.container);
      if (this.loading) {
        return;
      }
      const dom = this.$refs.container;
      const ran = dom.scrollTop + dom.clientHeight - dom.scrollHeight;
      if (ran <= 100) {
        this.addDom();
      }
    },

    setMainScroll(scrollTop) {
      this.$refs.container.scrollTop = scrollTop;
    },
  },

  mounted() {
    this.$refs.container.addEventListener("scroll", this.handleScroll);
    this.$bus.$on("setMainScroll", this.setMainScroll);
  },

  destroyed() {
    this.$refs.container.rovemEventListener("scroll", this.handleScroll);
    this.$bus.$off("setMainScroll", this.setMainScroll);
  },
};
</script>

<style scoped>
.about-container {
  width: 100%;
  height: 100%;
  padding: 25px 0;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>