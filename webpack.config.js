// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const bulmaPath = path.resolve(__dirname, 'css/bulma.css');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    
    return {
        mode: isDevelopment ? 'development' : 'production',
        devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
        entry: {
            settings: './src/entrypoints/settings.js',
            main: './src/entrypoints/main.js',
            background: './src/entrypoints/background.js',
            popup: './src/entrypoints/popup.js',
            conversations: './src/entrypoints/conversations.js',
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                    loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/,
                    include: bulmaPath,
                    use: [
                      'style-loader',
                      {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                      },
                      'postcss-loader',
                    ],
                  },
                  {
                    test: /\.css$/,
                    exclude: bulmaPath,
                    use: ['style-loader', 'css-loader'],
                  }             
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        plugins: []
    }
};