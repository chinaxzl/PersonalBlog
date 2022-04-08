// import Home from "@/views/Home";
// import Blog from "@/views/Blog";
// import About from "@/views/About";
// import Message from "@/views/Message";
// import Project from "@/views/Project";
// import BlogDetails from "@/views/Blog/Details";
import NotFound from "@/views/NotFound";
import "nprogress/nprogress.css";
import {
    start,
    done,
    configure
} from "nprogress"
configure({
    trickleSpee: 20,
    showSpinner: false
})

function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration);
    })
}

function getPageComponent(pageComponent) {
    return async () => {
        start()
        if (process.env.NODE_ENV === 'development') {
            await delay(3000)
        }
        const comp = await pageComponent();
        done()
        return comp
    }
}

export default [{
        name: "Home",
        path: "/",
        component: getPageComponent(() =>
            import("@/views/Home")
        ),
        meta: {
            title: "首页"
        }
    },
    {
        name: "Blog",
        path: "/article",
        component: getPageComponent(() =>
            import("@/views/Blog")
        ),
        meta: {
            title: "文章"
        }
    },
    {
        name: "BlogType",
        path: "/article/cate/:blogtypeId",
        component: getPageComponent(() =>
            import("@/views/Blog")
        ),
        meta: {
            title: "文章"
        }
    },
    {
        name: "BlogDetails",
        path: "/article/:id",
        component: getPageComponent(() =>
            import("@/views/Blog/Details")
        ),
        meta: {
            title: "文章详情"
        }
    },
    {
        name: "About",
        path: "/about",
        component: getPageComponent(() =>
            import("@/views/About")
        ),
        meta: {
            title: "关于我"
        }
    },
    {
        name: "Message",
        path: "/message",
        component: getPageComponent(() =>
            import("@/views/Message")
        ),
        meta: {
            title: "留言板"
        }
    },
    {
        name: "Project",
        path: "/project",
        component: getPageComponent(() =>
            import("@/views/Project")
        ),
        meta: {
            title: "项目&效果"
        }

    },

    {
        name: "NotFound",
        path: "*",
        component: NotFound
    }
]