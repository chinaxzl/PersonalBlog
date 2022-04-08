<template>
  <div class="imageLoader-container">
    <img v-if="!originalStateEnd" class="placeholder" :src="placeholder" alt="" />
    <img
      @load="handleLoad"
      :style="{ opacity: originalOpacity,transition:`${duration}ms` }"
      :src="src"
      alt=""
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },

    placeholder: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      default:2000
    },
  },

  data() {
    return {
      originalState: false,
      originalStateEnd : false,
    };
  },

  computed: {
    originalOpacity() {
      return this.originalState ? 1 : 0;
    },
  },

  methods: {
    handleLoad() {
        this.originalState = true;
        setTimeout(()=>{
            this.originalStateEnd = true;
            this.$emit("load");
        },this.duration);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.imageLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>