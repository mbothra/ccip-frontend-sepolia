const withTM = require('next-transpile-modules')(['@chainlink/components']); // pass the modules you would like to see transpiled

module.exports = withTM();
