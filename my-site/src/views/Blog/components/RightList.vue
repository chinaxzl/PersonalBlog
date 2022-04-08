<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelected }">{{
        item.name
      }}</span>
      <span
        class="totle"
        @click="handleClick(item)"
        :class="{ active: item.isSelected }"
        >{{ item.articleCount }}</span
      >
      <RightList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleClick(item) {
      if (!item.isSelected) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container {
  padding: 0;
  .right-list-container {
    margin-left: 1em;
  }
}
li {
  min-height: 40px;
  line-height: 40px;
  .totle {
    font-size: 14px;
    color: @gray;
    margin-left: 1em;
  }

  .active {
    color: @warn;
    font-weight: bold;
  }
  span {
    cursor: pointer;
  }
}
</style>