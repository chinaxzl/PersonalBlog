import eventBus from "@/eventBus";
import {
    debounce
} from "@/utils";
import defaultUrl from "@/assets/defaul.gif";

let imags = [];//新建数组，把img的dom和src传入便于操作

function setImg(img) {//操作img
    img.dom.src = defaultUrl//在图片未加载完成时，把全部图片设置为加载图片
    const top = img.dom.getBoundingClientRect().top;//获得每个元素距离可视窗口顶部的距离
    const height = 150;//由于在加载的时候无法获取元素的高度，手动设置元素最小高度
    const clientHeight = document.documentElement.clientHeight//获得可视窗口的高度
    if (top > -height && top < clientHeight) {
        const temImage = new Image(); //new一个新的newimg元素，并给newimg元素的src赋值，利用newimg的onload事件处理图片加载完成时，给img元素赋值
        temImage.onload = function () {
            img.dom.src = img.src
        }
        temImage.src = img.src
        imags = imags.filter((i)=>i !== img) //每处理完一个img元素，就要把该元素从数组中去除，以免重复操作以处理的元素
    }

}




function setImage() {//循环操作img元素
    for (const img of imags) {
        setImg(img)
    }
}




function handleMainScoll() {//当滚动条滚动时执行的函数
    setImage()
}



eventBus.$on("mainScroll", debounce(handleMainScoll, 50))//事件监听mainScroll,滚动条是否滚动




export default {
    inserted(el, bingding) {//在指令绑入父节点时，把dom和src加入进数组
        const dom = {
            dom: el,
            src: bingding.value
        }
        imags.push(dom);
        setImg(dom)

    },
    unbind(el) {//在指令和元素解绑时，需删除数组里面的值，若没删除会无限叠加
        imags = imags.filter(item => item.dom !== el)
    }
}