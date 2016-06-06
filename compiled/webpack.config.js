'use strict';

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: './client/dist',
    publicPath: './client/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css?modules'
    }]
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2suY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxPQUFQLEdBQWlCO0FBQ2YsU0FBTyxvQkFEUTtBQUVmLFVBQVE7QUFDTixVQUFNLGVBREE7QUFFTixnQkFBWSxlQUZOO0FBR04sY0FBVTtBQUhKLEdBRk87QUFPZixVQUFRO0FBQ04sYUFBUyxDQUNQO0FBQ0UsWUFBTSxTQURSO0FBRUUsZUFBUyxjQUZYO0FBR0UsY0FBUSxPQUhWO0FBSUUsYUFBTztBQUNMLGlCQUFTLENBQUMsT0FBRCxFQUFVLFFBQVY7QUFESjtBQUpULEtBRE8sRUFTUDtBQUNFLFlBQU0sUUFEUjtBQUVFLGNBQVE7QUFGVixLQVRPO0FBREg7QUFQTyxDQUFqQiIsImZpbGUiOiJ3ZWJwYWNrLmNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBlbnRyeTogJy4vY2xpZW50L2luZGV4LmpzeCcsXG4gIG91dHB1dDoge1xuICAgIHBhdGg6ICcuL2NsaWVudC9kaXN0JyxcbiAgICBwdWJsaWNQYXRoOiAnLi9jbGllbnQvZGlzdCcsXG4gICAgZmlsZW5hbWU6ICdidW5kbGUuanMnLFxuICB9LFxuICBtb2R1bGU6IHtcbiAgICBsb2FkZXJzOiBbXG4gICAgICB7XG4gICAgICAgIHRlc3Q6IC9cXC5qc3g/JC8sXG4gICAgICAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvLFxuICAgICAgICBsb2FkZXI6ICdiYWJlbCcsXG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgcHJlc2V0czogWydyZWFjdCcsICdlczIwMTUnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRlc3Q6IC9cXC5jc3MkLyxcbiAgICAgICAgbG9hZGVyOiAnc3R5bGUhY3NzP21vZHVsZXMnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxufTsiXX0=