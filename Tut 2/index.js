// const { error } = require('console')
const fsPromise = require('fs').promises
const path = require('path')

console.log(path.join(__dirname,'files','starter.txt'))

// fs.readFile(path.join(__dirname,'files','starter.txt'),{encoding:'utf8'},(erro,data)=>{
//     if(erro) throw error
//     console.log(data)
// })

// fs.writeFile(path.join(__dirname,'files','reply.txt'), 'Nice to see you ', (erro)=>{
//     if(erro) throw erro

//     console.log('write Complete')
//     fs.appendFile(path.join(__dirname,'files','reply.txt'),'\n\nwhat is next so',(error)=>{
//         if(error)throw error
//         console.log('append complete')

//         fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','rename.txt'),(error)=>{
//         if(error)throw error
//         console.log('rename Complete')
//     })
//     })
// })


// console.log('hello')
// process.on('uncaughtException', err =>{
//     console.log(`There was something wrong:${err}`),
//     process.exit(1)
// })

//New way to do the the above in a clearner way

const fileOps = async()=>{
    try{
        const data = await fsPromise.readFile(path.join(__dirname,'files','starter.txt'),'utf8')
        console.log(data)
        await fsPromise.unlink(path.join(__dirname,'files','starter.txt'))
        await fsPromise.writeFile(path.join(__dirname,'files','newFile.txt'),data)
        await fsPromise.appendFile(path.join(__dirname,'files','newFile.txt'), '\n\n This is Boolshit')
        await fsPromise.rename(path.join(__dirname,'files','newFile.txt'),path.join(__dirname,'files','newFile.txt'))
        const newData = await fsPromise.readFile(path.join(__dirname,'files','newFile.txt'),'utf8')
        console.log(newData)
    }catch(error){
        throw error
    }
}

fileOps()

