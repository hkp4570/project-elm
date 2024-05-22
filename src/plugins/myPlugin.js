// Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
export default {
    install(Vue, options) {
        // 添加实例方法
        Vue.prototype.$myGlobalProperty = function () {
            console.log('全局实例方法')
        }
    }
}