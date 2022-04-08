<template>
  <div @click="handleClick" v-show="show" class="to-top-container">Top</div>
</template>

<script>
export default {

    data(){
        return {
            show:false
        }
    },


    created() {//监听滚动事件
        this.$bus.$on("mainScroll", this.handleScroll);
    },

    beforeDestroy() {//取消监听
        this.show = false;
        this.$bus.$off("mainScroll", this.handleScroll);
    },


    methods:{
        handleScroll(dom){//判断dom滚动高度是否符合要求。设置show
            if(!dom){
                this.show = false;
                return;
            }
            this.show = dom.scrollTop > 200;
        },


        handleClick(){//点击top运行事件
            this.$bus.$emit("setMainScroll",0)
        }
    }

}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container{
    width: 50px;
    height: 50px;
    background: @primary;
    border-radius: 50%;
    position:fixed;
    bottom: 50px;
    right: 50px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    line-height:50px;
    z-index: 99;
}

</style>