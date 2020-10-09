const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve('D:/www/mktp/site/', 'dist'),
    filename: 'bundle.js'
  }
}