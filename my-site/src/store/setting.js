import {getSettings} from "@/api/setting";
import {setTitle} from "@/utils"


export default {
    namespaced: true,
    state: {
        loading: false,
        data: null
    },

    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },

        setData(state, payload) {
            state.data = payload
        }
    },


    actions: {
        async fachsetting(ctx) {
            ctx.commit("setLoading", true);
            const resp = await getSettings();
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false);
            if(resp.siteTitle){
                setTitle.setStoreTitle(resp.siteTitle)
            }
        }
    }
}