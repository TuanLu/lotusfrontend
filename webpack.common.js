var webpack = require('webpack');
var path = require('path');
module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      path.resolve(__dirname, "app"), 
      "node_modules"
    ],
    alias: {
      //"react": "preact-compat",
      //"react-dom": "preact-compat",
      ACTION_TYPES: path.resolve(__dirname, 'app/actions/ACTION_TYPES'),
      actions: path.resolve(__dirname, 'app/actions/index'),
      ISD_API: path.resolve(__dirname, 'app/api/api'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        },
        //include: __dirname + '/app/'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
