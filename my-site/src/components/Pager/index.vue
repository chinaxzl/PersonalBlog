<template>
  <div class="pager-container">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(n)"
      v-for="(n, i) in numbers"
      :key="i"
      :class="{ active: n === current }"
      >{{ n }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pagerNumber }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(pagerNumber)"
      :class="{ disabled: current === pagerNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      //当前页码
      type: Number,
      default: 1,
    },

    total: {
      //总数据量
      type: Number,
      default: 0,
    },

    limit: {
      //页容量
      type: Number,
      default: 10,
    },

    visibleNumber: {
      //可见页码数
      type: Number,
      default: 10,
    },
  },

  computed: {
    pagerNumber() {
      //计算总页码数
      return Math.ceil(this.total / this.limit);
    },

    visibleMin() {
      //计算可见页码数最小值
      var min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },

    visibleMax() {
      //计算可见页码数最大值
      var max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.pagerNumber) {
        max = this.pagerNumber;
      }
      return max;
    },

    numbers() {
      //创建数组，把页码数push进数组方便循环
      var arr = [];
      for (var i = this.visibleMin; i <= this.visibleMax; i++) {
        arr.push(i);
      }
      return arr;
    },
  },

  methods: {
    handleClick(page) {
      if (page < 1) {
        page = 1;
      }
      if (page > this.pagerNumber) {
        page = this.pagerNumber;
      }
      if (page === this.current) {
        return;
      }
      this.$emit("pageChange", page);
    },
  },
};
</script>




<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px;
  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }

}
</style>