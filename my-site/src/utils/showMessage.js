import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon"
import styles from "./showMessage.module.less";


/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type info error success warn
 * @param {Number} duration 
 * @param {HTMLElement} container 
 */
export default function (options = {}) {

    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;

    const div = document.createElement("div");
    const icon = getComponentRootDom(Icon, {
        type
    });
    const typeClassName = styles[`message-${type}`]
    div.className = `${styles.message} ${typeClassName}`
    div.innerHTML = `<span class="${styles.icon}">${icon.outerHTML}</span><div>${content}</div>`;
    container.appendChild(div);
    if (!container) {
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }
    }


    div.clientHeight;

    div.style.transform = "translate(-50%,-50%)";
    div.style.opacity = 1;


    setTimeout(function () {
        div.style.transform = "translate(-50%,-50%) translateY(-25px)";
        div.style.opacity = 0;
        div.addEventListener("transitionend", function () {
            div.remove();
            options.callback && options.callback();
        }, {
            once: true
        })
    }, duration)



}