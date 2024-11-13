// webpack.config.js
const path = require('path');

module.exports = {
    entry: './build/test.js',
    output: {
        filename: 'validare-web.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'validare',
        libraryTarget: 'umd',
    },
    mode: 'production',
    resolve: {
        fallback: {
            fs: false, // fs modülünü tamamen devre dışı bırak
            path: false, // path modülünü devre dışı bırak
            express: false
        },
    }
};  