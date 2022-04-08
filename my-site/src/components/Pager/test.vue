<template>
  <Pager :total="total" :current="current" />
</template>

<script>
import Pager from "@/components/Pager";
export default {
    components:{
        Pager
    },

    data(){
        return {
            total:302,
            current:1
        }
    }
}
</script>

<style>

</style>