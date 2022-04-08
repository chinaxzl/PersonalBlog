<template>
  <div class="img-container">
    <ImageLoader
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
      :duration="3000"
    />
  </div>
</template>

<script>
import ImageLoader from "./index.vue";
export default {
  components: {
    ImageLoader,
  },
};
</script>

<style scoped>
.img-container {
  width: 500px;
  height: 500px;
  margin: 100px auto;
  border: 1px solid black;
}
</style>