const path = require('path')

module.exports = {
    mode: 'development',
    watch: false,
    context: path.resolve(__dirname, 'src'),
    entry: './production-model.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'production-model.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}    

