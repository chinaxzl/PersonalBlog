<template>
  <ul class="contact-container" v-if="data">
    <li>
      <a :href="data.github"
        ><div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ data.githubName }}</span>
      </a>
    </li>

    <li>
      <a :href="`mailto:${data.mail}`"
        ><div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{ data.mail }}</span>
      </a>
    </li>

    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
        ><div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{ data.qq }}</span>
      </a>
      <div class="pop">
        <img :src="data.qqQrCode" alt="" />
      </div>
    </li>

    <li>
      <a
        ><div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span>{{ data.weixin }}</span>
      </a>
      <div class="pop">
        <img :src="data.weixinQrCode" alt="" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },

  

  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/global.less";
.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  li {
    position: relative;
    height: 30px;
    line-height: 30px;
    margin: 14px 0;
    &:hover {
      .pop {
        transform: scale(1);
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
  }
  .icon {
    font-size: 26px;
    width: 36px;
    &.weixin {
      font-size: 32px;
      text-indent: -3px;
    }
  }
  .pop {
    position: absolute;
    left: 0;
    bottom: 35px;
    padding: 10px 20px;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    transition: 0.3s;
    transform: scale(0);
    transform-origin: bottom center;
    img {
      width: 150px;
      height: 150px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -4px;
      width: 8px;
      height: 8px;
      background: #fff;
      transform: rotate(45deg);
    }
  }
}
</style>