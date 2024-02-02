const fs = require('fs')

const rs = fs.createReadStream('./files/lorem.txt','utf8') 

const ws = fs.createWriteStream('./files/new_lorem.txt')
console.log(rs)

rs.on('data',(dataChunk)=>{
    ws.write(dataChunk)
})
rs.pipe(ws)