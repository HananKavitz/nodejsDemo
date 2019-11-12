const path = require("path"),
  webpack = require("webpack"),
  cleanWebpackPlugin = require("clean-webpack-plugin");

  const distDir = path.resolve(__dirname, "dist");

module.exports = {
  target: "node",
  context: __dirname,
  entry: path.resolve(distDir, "app.js"),
  output: {
    path: distDir,
    filename: "app.js"
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "awesome-typescript-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "source-map-loader"
        }
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(["dist"]),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};
