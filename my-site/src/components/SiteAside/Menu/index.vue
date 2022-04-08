<template>
  <nav class="menu-container">
    <RouterLink
      :exact="item.exact"
      v-for="item in items"
      :key="item.link"
      :to="{name:item.name}"
      
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },

  data() {
    return {
      items: [
        {
          name:"Home",
          title: "首页",
          icon: "home",
          exact:true,
        },

        {
          name:"Blog",
          title: "文章",
          icon: "blog",
          startWith: true,
        },

        {
          name:"About",
          title: "关于我",
          icon: "about",
          exact:true,
        },

        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact:true,
        },

        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact:true,
        },
      ],
    };
  },

  
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/global.less";
.menu-container {
  margin: 24px 0;
  color: @gray;
  a {
    display: flex;
    padding: 0 50px;
    height: 45px;
    line-height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
    &.router-link-active {
      background: darken(@words, 3%);
    }
  }
}
</style>