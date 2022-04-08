export default function (fn, duration = 300) {
    var timer = null;
    return (...argn) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...argn)
        }, duration);
    }
}