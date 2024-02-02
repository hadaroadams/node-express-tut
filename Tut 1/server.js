
console.log('sads')

const os = require('os');
const path = require('path')
const {add,divided,multiply,subtruct}= require('./math')
console.log(add(4,5))
console.log(divided(4,5))
console.log(multiply(4,5))
console.log(subtruct(4,5))

console.log(os.type())
console.log(__dirname)
console.log(__filename)
console.log(path.basename(__filename))
console.log(path.dirname(__filename))
console.log(path.extname(__filename))
console.log(path.parse(__dirname))
