<template>
  <div class="blog-comment-container">
    <MessageArea
      :title="'评论列表'"
      :subTitle="`(${data.total ? data.total : 0})`"
      :list="data.rows"
      @submit="handleSubmit"
      :isListLoading="isLoading"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { getComment, postComment } from "@/api/blog";
export default {
  components: {
    MessageArea,
  },

  data() {
    return {
      data: {},
      isLoading: true,
      page: 1,
      limit: 10,
    };
  },


  async created() {
    this.data = await getComment(this.page, this.limit, this.$route.params.id);
    this.isLoading = false;
    this.$bus.$on("mainScroll",this.handleScroll)
  },


  beforeDestroy(){
    this.$bus.$off("mainScroll",this.handleScroll)
  },

  methods: {
    async handleSubmit(item, callback) {//接受子组件传来的事件，参数，处理
      const resp = await postComment({
          ...item,
          blogId:this.$route.params.id
      });
      this.data.rows.unshift(resp);
      this.data.total++
      callback("评论成功")
    },


    async addComment(){//加载评论下一页
    
      if(this.data.rows.length > this.data.total){
        return
      }
      this.isLoading = true;
      this.page++
      const resp = await getComment(this.page, this.limit, this.$route.params.id);
      this.data.total = resp.total
      this.data.rows =  this.data.rows.concat(resp.rows)
      this.isLoading = false;
    },


     handleScroll(dom) {//判断滚动条是否到底底部
      if(this.isLoading || !dom){
        return
      }
      const rgn = Math.abs(dom.scrollTop +  dom.clientHeight - dom.scrollHeight);
      if(rgn <=100){
        this.addComment()
      }
    }




  },




};
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>