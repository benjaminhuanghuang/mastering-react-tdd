## Jest
```
  npm i -D jest
```
create script in package.json
```
  "test": "jest --watchAll"
```

## React
```
  npm i -D react react-dom
```
## Bable
Install
```
  npm i -D @babel/preset-env @babel/preset-react
  npm i -D @babel/plugin-transform-runtime
  npm i -S @babel/runtime
```
[About @babel/plugin-transform-runtime](https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1)

create .babelrc


## webpack and loaders
Install
```
  npm i -D webpack webpack-cli babel-loader
```
create webpack.config.js
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
webpack will create main.js under **dist** foder by default.

create script in package.json
```
  "build": "webpack"
```