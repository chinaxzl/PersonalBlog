<template>
  <div v-loading="loading" class="home-container" @wheel="hanldeWheel">
    <ul class="carouselitem" ref="container" :style="{ marginTop }" v-if="data">
      <li v-for="item in data" :key="item.id">
        <Carouselitem :carousel="item" />
      </li>
      <div
        v-show="index > 0"
        class="icon icon-up"
        @click="hanldeClick(index - 1)"
      >
        <Icon type="arrowUp" />
      </div>
      <div
        v-show="index < data.length - 1"
        class="icon icon-down"
        @click="hanldeClick(index + 1)"
      >
        <Icon type="arrowDown" />
      </div>
      <ul class="indicator">
        <li
          v-for="(item, i) in data"
          :key="item.id"
          :class="{ active: index === i }"
          @click="hanldeClick(i)"
        ></li>
      </ul>
    </ul>
  </div>
</template>
<script>
// import { getBanner } from "@/api/banner";
import Carouselitem from "./Carouselitem.vue";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Carouselitem,
    Icon,
  },

  data() {
    return {
      index: 0, //当前图片索引
      carouselitemHeight: 0, //宽度
    };
  },

  created() {
    //异步获取首页数据
    // this.banner = await getBanner();
    // this.isLoading = false;

    this.$store.dispatch("banner/fachbanner");
  },

  mounted() {

    //获取marginTop元素的高度
    this.carouselitemHeight = this.$refs.container.clientHeight;
    //视口大小变化处理
    window.addEventListener("resize", this.hanldeReSize);
  },

  destroyed() {
    window.removeEventListener("resize", this.hanldeReSize);
  },

  computed: {
    marginTop() {
      //改变carouselitem的marginTop值实现轮播
      return -this.index * this.carouselitemHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },

  methods: {
    hanldeClick(i) {
      //改变索引值
      this.index = i;
    },

    hanldeWheel(e) {
      //鼠标滚轮事件判断
      if (e.deltaY === 125) {
        this.index++;
        if (this.index > this.data.length - 1) {
          this.index = this.data.length - 1;
        }
      } else if (e.deltaY === -125) {
        this.index--;
        if (this.index < 1) {
          this.index = 0;
        }
      }
    },

    hanldeReSize() {
      //视口大小变化重新获取元素大小
      if (this.$refs.container) {
        return;
      }
      this.carouselitemHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.carouselitem {
  width: 100%;
  height: 100%;
  transition: 0.4s;
  li {
    width: 100%;
    height: 100%;
  }
}

@keyframes jump-up {
  0% {
    transform: translate(-50%, 5px);
  }

  50% {
    transform: translate(-50%, -5px);
  }

  100% {
    transform: translate(-50%, 5px);
  }
}

@keyframes jump-down {
  0% {
    transform: translate(-50%, -5px);
  }

  50% {
    transform: translate(-50%, 5px);
  }

  100% {
    transform: translate(-50%, -5px);
  }
}

.icon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  color: @gray;
  cursor: pointer;
}

.icon-up {
  top: 20px;
  animation: jump-up 2s infinite;
}

.icon-down {
  bottom: 20px;
  animation: jump-down 2s infinite;
}

.indicator {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  li {
    width: 10px;
    height: 10px;
    border: 1px solid #fff;
    background: @words;
    border-radius: 50%;
    margin: 10px 0;
    cursor: pointer;
    box-sizing: border-box;
    &.active {
      background: #fff;
    }
  }
}
</style>