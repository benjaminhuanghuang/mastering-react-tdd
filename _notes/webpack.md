

## Install and setup webpack
```
  npm i -D webpack webpack-cli babel-loader
```

webpack will create main.js under dist by default.
```
module.exports = {
 mode: "development",
 module: {
   rules: [{
     test: /\.(js|jsx)$/,
     exclude: /node_modules/,
     loader: 'babel-loader'}]}
};
```