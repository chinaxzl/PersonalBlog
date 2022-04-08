var routeTitle = "",
    storeTitle = "";



function setTitle() {
    if (!routeTitle && !storeTitle) {
        document.title = "loading...";
        return
    } else if (routeTitle && !storeTitle) {
        document.title = routeTitle;
    } else if (!storeTitle && routeTitle) {
        document.title = storeTitle
    } else {
        document.title = routeTitle + "-" + storeTitle
    }
}


export default {
    setRouterTitle(title) {
        routeTitle = title
        setTitle()
    },


    setStoreTitle(title) {
        storeTitle = title
        setTitle()
    },
}