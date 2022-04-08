// var list = {};

// export default {

//     //监听事件
//     $on(event, handler) {
//         if (!list[event]) {
//             list[event] = new Set();
//         }
//         list[event].add(handler);
//     },

//     //取消监听
//     $off(event, handler) {
//         if (!list[event]) {
//             return;
//         }
//         list[event].delete(handler);
//     },

//     //执行监听函数
//     $emit(event, ...ager) {
//         if (!list[event]) {
//             return;
//         }
//         for (const handler of list[event]) {
//             handler(...ager)
//         }

//     }

// }


import Vue from 'vue';


/**
 * 事件名:mainScollr
 * 含义：主区域滚动条位置变化后触发
 * 参数：滚动的dom元素
 * 
 * 
 * 事件名:setMainScroll
 * 含义：点击回到Top后触发
 * 参数：回到哪个位置
 */
const app = new Vue({})
Vue.prototype.$bus = app;
export default app;