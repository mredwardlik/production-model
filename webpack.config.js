const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "production",
    entry: "./src/production-model.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'production-model.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/template.html',
            favicon: './src/favicon.ico'
        })
    ]
}