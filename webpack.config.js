const webpack = require('webpack');

module.exports = env => {
  let dev = false;
  let testing = false;
  let docker = false;
  let nodeEnv = '"production"';
  if (env.development) {
    dev = true;
    nodeEnv = '"development"'
  }
  if (env.testing) {
    testing = true;
    nodeEnv = '"testing"'
  }
  if (env.docker) {
    docker = true;
    nodeEnv = '"production"'
  }
  return {
    entry: [
      'babel-polyfill',
      './client/index.js',
    ],
    output: {
      path: __dirname,
      filename: './build/bundle.js',
    },
    devtool: 'source-map',
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0']
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif|ttf|woff|woff2|eot|svg)$/,
          use: [
            { loader: 'url-loader' }
          ]
        }
      ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: nodeEnv
          }
        }),
        new webpack.DefinePlugin({
        __DEVELOPMENT__: JSON.stringify(dev),
        __TESTING__: JSON.stringify(testing),
        __DOCKER__: JSON.stringify(docker),
        })
    ]
  }
};