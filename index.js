const Colors = require ('./src/colorkrakenfunctions');
let colors = Colors.reduce((acc,elem) => ({...acc,...elem}),{});

module.exports = colors;