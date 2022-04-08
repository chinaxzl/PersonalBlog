<template>
  <div
    class="carousel-item-container"
    ref="carousel"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseleave"
  >
    <div class="carousel-img" ref="img" :style="setImgPosition">
      <ImageLoader
        @load="hanldeLoad"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="description" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],

  components: {
    ImageLoader,
  },

  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      carouselSize: null,
      imgSize: null,
      moveX: 0,
      moveY: 0,
    };
  },

  mounted() {
    //获取两段文字的宽度
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize(); //获取图片和容器大小
    this.moveX = this.center.x;
    this.moveY = this.center.y;
  },

  computed: {
    setImgPosition() {
      //设置图片位置
      if (!this.imgSize || !this.carouselSize) {
        return;
      }
      var differenceWidht = this.imgSize.width - this.carouselSize.width; //计算容器和图片大小的差值
      var differenceHeight = this.imgSize.height - this.carouselSize.height;
      var X = (-differenceWidht / this.carouselSize.width) * this.moveX;
      var Y = (-differenceHeight / this.carouselSize.height) * this.moveY;
      return {
        transform: `translate(${X}px, ${Y}px)`,
      };
    },

    center() {
      return {
        x: this.carouselSize.width / 2,
        y: this.carouselSize.height / 2,
      };
    },
  },

  methods: {
    shouWords() {
      //设置文字显示
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = "0.5s";
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth;
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },

    hanldeLoad() {
      //图片加载完，才显示文字
      this.shouWords();
    },

    handleMousemove(e) {
      //获得鼠标在容器内的坐标
      var rect = this.$refs.carousel.getBoundingClientRect();
      this.moveX = e.clientX - rect.left;
      this.moveY = e.clientY - rect.top;
    },

    setSize() {
      //获取容器的大小
      this.carouselSize = {
        width: this.$refs.carousel.clientWidth,
        height: this.$refs.carousel.clientHeight,
      };
      //获取图片的大小
      this.imgSize = {
        width: this.$refs.img.clientWidth,
        height: this.$refs.img.clientHeight,
      };
    },

    handleMouseleave() {
      this.moveX = this.center.x;
      this.moveY = this.center.y;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;

  .carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    transition: 0.3s;
  }

  .title,
  .description {
    position: absolute;
    letter-spacing: 3px;
    left: 30px;
    color: #fff;
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  }

  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }

  .description {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>