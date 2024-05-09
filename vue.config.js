const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            "/v1": {
                target: "http://cangdu.org:8001"
            }
        }
    }
})
