var $ = require('jquery')

var ES6Base = {
  run: () => {
    console.log('hello')
    $('p').text('jQuer 调用成功！')
  }
}

console.log($)

module.exports = ES6Base
