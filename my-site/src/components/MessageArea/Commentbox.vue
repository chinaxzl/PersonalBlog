<template>
  <ul class="comment-box-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar" :size="50" />
      <div class="comment">
        <div class="name">{{ item.nickname }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="time">{{setDate(item.createDate,true)}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import { setDate } from "@/utils";
export default {
  components: {
    Avatar,
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    setDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
li {
  display: flex;
  border-bottom: 1px solid lighten(@gray, 20%);
  padding: 15px 0;
}

.comment {
  margin-left: 15px;
  position: relative;
  flex: 1 1 auto;
}

.name {
  margin-bottom: 10px;
  color: darken(@success, 10%);
}

.content {
  font-size: 14px;
}

.time {
  position: absolute;
  right: 0;
  top: 0;
  color: @gray;
  font-size: 14px;
}
</style>