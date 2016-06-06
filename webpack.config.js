module.exports = {
  entry: './client/index.jsx',
  output: {
    path: './client/dist',
    publicPath: './client/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
      },
    ],
  },
};