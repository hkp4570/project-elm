const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true, devServer: {
        proxy: {
            "/v1": {
                target: "http://cangdu.org:8001"
            }
        }
    }, configureWebpack: {
        resolve: {
            fallback: {
                'assert': false,
                'process': false,
                'url': false,
                'path-browserify': false,
                'util': false,
                "path": false,
                "fs": false,
                "module": false,
                "v8": false,
            }
        }
    }
})
