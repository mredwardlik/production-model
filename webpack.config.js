const path = require('path')

module.exports = {
    mode: 'development',
    watch: false,
    context: path.resolve(__dirname, 'src'),
    entry: './ProductionModel.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'production-model.min.js',
        libraryExport: 'default',
        libraryTarget: 'umd',
        library: 'ProductionModel'
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'source-map',
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
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties', 
                            '@babel/plugin-proposal-private-methods',
                            '@babel/plugin-proposal-private-property-in-object'
                        ]
                    }
                }
            }
        ]
    }
}    

