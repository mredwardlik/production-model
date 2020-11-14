const path = require('path')
const html = require('html-webpack-plugin')

module.exports = {
    mode: "production",
    entry: "./src/production-model.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'production-model.js'
    },
    plugins: [
        new html({
            template: './src/template.html'
        })
    ]
}