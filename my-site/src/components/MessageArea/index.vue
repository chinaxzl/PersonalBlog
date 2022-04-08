<template>
  <div class="message-area-container" >
    <Inputbox  v-on="$listeners"/>
    <h3>
      {{title}}
      <span>{{subTitle}}</span>
    </h3>
    <Commentbox :list="list" />
    <div class="loading" v-loading="isListLoading" ></div>
  </div>
</template>

<script>
import Inputbox from "./Inputbox";
import Commentbox from "./Commentbox";
export default {
  components: {
    Inputbox,
    Commentbox,
  },

  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },

};
</script>

<style scoped lang="less">
.loading{
  position: relative;
}
</style>