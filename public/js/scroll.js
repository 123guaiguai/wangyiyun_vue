function animation(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        if (obj.scrollTop >= target) {
            clearInterval(obj.timer)
            if (callback) {
                callback();
            }
        } else {
            let step = (target - obj.scrollTop) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.scrollTop += step;
        }
    }, 40)
}
export default animation