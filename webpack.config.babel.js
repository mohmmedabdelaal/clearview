import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
const postCSSPlugins = [
  require('postcss-mixins'),
  require('postcss-import'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer'),
];

export default {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: 'assets/img/[name].[ext]',
  },
  devServer: {
    watchFiles: ['app/**/*.html'],
    static: {
      directory: path.join(__dirname, 'src'),
      watch: false,
    },
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: postCSSPlugins } },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      favicon: 'assets/img/icons/facebook.svg',
    }),
  ],
  stats: 'minimal',
  devtool: 'source-map',
  mode: 'development',
};
