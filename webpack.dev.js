const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
   mode: 'development',
   output: {
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/'
   },
   module: {
      rules: [
         // Excludes style files in node_modules
         // Prevent global class names to rename to hashed module name
         {
            test: /\.(c|s(a|c))ss$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: 'style-loader' // 3. Inject styles into DOM
               },
               {
                  loader: 'css-loader', // 2. Turns css into commonjs
                  options: {
                     sourceMap: true,
                     modules: true,
                     localIdentName: '[local]__[hash:base64:5]'
                  }
               },
               {
                  loader: 'sass-loader', // 1. Turns sass into css
                  options: {
                     sourceMap: true
                  }
               }
            ]
         },
         // Includes style files in node_modules
         // To use global class names in bundle
         {
            test: /\.(c|s(a|c))ss$/,
            include: /node_modules/,
            use: [
               {
                  loader: 'style-loader' // 3. Inject styles into DOM
               },
               {
                  loader: 'css-loader', // 2. Turns css into commonjs
                  options: {
                     sourceMap: true
                  }
               },
               {
                  loader: 'sass-loader', // 1. Turns sass into css
                  options: {
                     sourceMap: true
                  }
               }
            ]
         }
      ]
   },
   devServer: {
      historyApiFallback: true
   },
   plugins: [
      new HtmlWebpackPlugin({
         favicon: './src/favicon.ico',
         template: './src/index.html'
      })
   ]
});
