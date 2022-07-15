import webpack from "webpack";

module.exports = {
  devtool: "source-map",
  mode: "production",
  externals: [
    {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react",
      },
    },
    {
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom",
      },
    },
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: { warnings: false },
    }),
  ],
};
