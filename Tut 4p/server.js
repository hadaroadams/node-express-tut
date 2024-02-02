const http = require('http')
const path = require('path')
const fs = require('fs')
const { escape } = require('querystring')
const { url } = require('inspector')
const fsPromise = require('fs').promises

const PORT = process.env.PORT || 3300

const  serveFile = async ( response , filePath , contentType )=> {
    try{
        const data = await fsPromise.readFile( filePath,'utf8' )
        response.end(data)
        // console.log(data)
    }catch(erro){
        console.log(erro)
    }
}

const server = http.createServer((request,response)=>{
    // console.log(request.url,response)

    let contentType 
    let extention = path.extname(request.url)
    console.log(extention)

    if(request.url=='/'){
        extention = '.html'
    }

    switch (extention){
        case '.html':
            contentType ='text/html';
        break;
        case '.css':
            contentType = 'text/'

        default:
            contentType='text/html'
    }

    let filePath = path.join(__dirname,'views' ,request.url)
    if(!extention) filePath =+'.html'
    console.log(request.url)

    console.log(filePath)


    if(!fs.existsSync(filePath)) {
        filePath = path.join(__dirname,'views', '404.html')
    }else if(request.url==='/'){
        filePath= path.join(__dirname,'views', 'index.html')
    }
    

    serveFile(response,filePath,contentType)  
})

server.listen( PORT , ()=> console.log('started node server') )
// console.log(path.join(__ydirname,'exit'))



