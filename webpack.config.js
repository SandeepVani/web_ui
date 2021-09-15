const path = require("path");

module.exports = {
  entry: "./src/main.js",
  mode: "production",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
};
