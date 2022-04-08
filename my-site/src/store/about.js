import {getAbouts} from "@/api/about";


export default {
    namespaced: true,
    state:{
        loading:false,
        url:""
    },

    mutations:{
        setLoading(state, payload) {
            state.loading = payload;
        },

        setAboutUrl(state, payload){
            state.url = payload
        }
    },

    actions:{
        async getAbout(ctx){
            if(ctx.state.url){
                return
            }
            ctx.commit("setLoading", true);
            const resp = await getAbouts();
            ctx.commit("setAboutUrl",resp);
            ctx.commit("setLoading",false)
        }
    }

}
