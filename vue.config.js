const {defineConfig} = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

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
                // 'assert': false,
                // 'process': false,
                // 'url': false,
                // 'path-browserify': false,
                // 'util': false,
                // "fs": false,
                "module": false,
                "v8": false,
                // "path": require.resolve("path-browserify")
            }
        },
        plugins: [
            new NodePolyfillPlugin()
        ]
    }
})
