import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";
function judgeImg(el) { //判断el中是否存在含有data-loading的img元素
    return el.querySelector('img[data-role]');
}

function foundImg(){//创建Img元素
    var img = document.createElement('img');
    img.dataset.role = "loading";
    img.src = loadingUrl;
    img.className = styles.loading
    return img;
}
//自定义指令
export default function (el, bingding) {
    const curimg = judgeImg(el)
    if (bingding.value) {
        if (!curimg) {//是否存在，不存在创建img，存在删除img
            const img = foundImg();
            el.appendChild(img);
        }
    } else {
        if(curimg){
            curimg.remove();
        }
    }
}


// value