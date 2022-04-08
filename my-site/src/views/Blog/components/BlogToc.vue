<template>
  <div class="blog-toc-container">
    <h2>文章分类</h2>
    <RightList :list="addSelected" @select="handelSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import { debounce } from "@/utils";
export default {
  components: {
    RightList,
  },

  props: {
    list: {
      type: Array,
    },
  },

  data() {
    return {
      listAnchor: "",
    };
  },

  computed: {
    addSelected() {//递归给list每项添加isSelected属性
      const getToc = (list = []) => {
        return list.map((l) => ({
          ...l,
          isSelected: l.anchor === this.listAnchor,
          children: getToc(l.children),
        }));
      };
      return getToc(this.list);
    },

    dom() {//循环list由list.anchor找出需要的dom
      const dom = [];
      for (const list of this.list) {
        dom.push(document.getElementById(list.anchor));
        if (list.children && list.children.length > 0) {
          for (const list of list.children) {
            dom.push(document.getElementById(list.anchor));
          }
        }
      }
      return dom;
    },
  },

  methods: {
    handelSelect(item) {
      location.hash = item.anchor;
    },

    setSelected(scllordom) {//设置条件，判断dom距离顶部的距离是否符合要求，改变this.listAnchor从而改变isSelected的值
      if(!scllordom){
        return
      }
      this.listAnchor = "";
      const Range = 200;
      for (const dom of this.dom) {
        if (!dom) {
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if (top > 0 && top <= Range) {
          this.listAnchor = dom.id;
        } else if (top > Range) {
          return;
        } else {
          this.listAnchor = dom.id;
        }
      }
    },
  },
  created() {//事件监听maiScroll，处理函数setSelected---事件总线
    this.setSelectedDebounce = debounce(this.setSelected, 50);
    this.$bus.$on("mainScroll", this.setSelectedDebounce);
  },

  destroyed() {//取消监听
    this.$bus.$off("mainScroll", this.setSelectedDebounce);
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  h2 {
    font-size: 1em;
    font-weight: bold;
    margin: 0;
    letter-spacing: 2px;
  }
}
</style>