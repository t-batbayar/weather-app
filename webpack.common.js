module.exports = {
   entry: './src/index.js',
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [
                     '@babel/preset-env',
                     '@babel/preset-react',
                     {
                        plugins: [
                           '@babel/plugin-proposal-class-properties',
                           '@babel/plugin-syntax-dynamic-import'
                        ]
                     }
                  ]
               }
            }
         },
         {
            test: /\.html$/,
            use: ['html-loader']
         },
         {
            test: /\.(png|jpe?g|gif)$/,
            use: {
               loader: 'file-loader',
               options: {
                  name: '[folder]/[name]-[hash].[ext]',
                  outputPath: 'images'
               }
            }
         },
         {
            test: /\.(woff(2)?|ttf|eot|otf|svg)$/,
            use: {
               loader: 'file-loader',
               options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts'
               }
            }
         }
      ]
   }
};
