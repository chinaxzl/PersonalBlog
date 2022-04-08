<template>
  <form
    ref="formcontainer"
    @submit.prevent="handleSubmit"
    class="input-box-container"
    id="formcontainer"
  >
    <div class="form-item">
      <div class="input-item">
        <input
          type="text"
          placeholder="用户名称"
          v-model="xinxi.nickName"
          maxlength="10"
        />
        <span class="tip">{{ xinxi.nickName.length }}/10</span>
      </div>
      <div class="error">{{ error.nickName }}</div>
    </div>
    <div class="form-item">
      <div class="text-item">
        <textarea
          placeholder="输入内容"
          maxlength="300"
          v-model="xinxi.nickContent"
        ></textarea>
        <span class="tip">{{ xinxi.nickContent.length }}/300</span>
      </div>
      <div class="error">{{ error.nickContent }}</div>
    </div>
    <div class="form-item">
      <div class="btn-item">
        <button :disabled="steta">{{ steta ? "提交中..." : "提交" }}</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      xinxi: {
        nickName: "",
        nickContent: "",
      },
      error: {
        nickName: "",
        nickContent: "",
      },
      steta: false,
    };
  },

  methods: {
    handleSubmit() {//注册提交事件
      this.error.nickName = this.xinxi.nickName ? "" : "请输入姓名";
      this.error.nickContent = this.xinxi.nickContent ? "" : "请输入内容";
      if (this.error.nickName || this.error.nickContent) {
        return;
      }
      this.steta = true;
      this.$emit("submit", this.xinxi, (content) => {//向父组件抛出事件，参数，回调
        this.$showMessage({
          type: "success",
          duration: 1000,
          container:this.$refs.formcontainer,
          content: content,
          callback:()=> {
            this.steta = false;
            this.xinxi.nickName = "";
            this.xinxi.nickContent = "";
          },
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.input-box-container {
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
}

.form-item {
  margin-bottom: 8px;
}

.input-item {
  width: 50%;
  position: relative;
}

.text-item {
  position: relative;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px dashed black;
  box-sizing: border-box;
  outline: none;
  color: @words;
  border-radius: 5px;
  font-size: 14px;
  border: 1px dashed @gray;
  &:focus {
    border-color: @primary;
  }
}

input {
  height: 40px;
  padding: 0 15px;
}

textarea {
  resize: none;
  height: 120px;
  padding: 8px 15px;
}

.tip {
  position: absolute;
  bottom: 5px;
  right: 6px;
  font-size: 12px;
  color: @gray;
}

.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}

button {
  width: 100px;
  height: 40px;
  background-color: @primary;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
  &:disabled {
    background: @gray;
    cursor: not-allowed;
  }
}
</style>