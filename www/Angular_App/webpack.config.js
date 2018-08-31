// Change to transpile in dev mode
console.log("Environment: |" + process.env.NODE_ENV + "|");
var mod = process.env.NODE_ENV.indexOf("prod") > -1 ? require('./config/webpack.prod.js') : require('./config/webpack.dev.js');
module.exports = mod;