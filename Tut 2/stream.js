const fs = require('fs')

const rs = fs.createReadStream('./files/lorem.txt','utf8') 
// console.log(rs)

const ws = fs.createWriteStream('./files/new_lorem.txt')
console.log(rs)

rs.on('data',(dataChunk)=>{
    ws.write(dataChunk)
    console.log(dataChunk)
})
rs.pipe(ws)