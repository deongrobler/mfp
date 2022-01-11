const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
 
const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      // shared: ['react', 'react-dom'],
      shared: packageJson.dependencies
    }),
  ],
};

// Order matters, last overrides if its re-specified
module.exports = merge(commonConfig, devConfig);