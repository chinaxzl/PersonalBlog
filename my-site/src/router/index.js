import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from "./routes";
import {setTitle} from "@/utils";
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode:"history",
})


router.afterEach((to,from)=>{
    if(to.meta.title){
        setTitle.setRouterTitle(to.meta.title)
    }
})

export default router