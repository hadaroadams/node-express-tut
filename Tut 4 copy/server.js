const {add,logEvents} = require('./logEvents.js')
const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

// console.log(add(2+3))

// console.log(process)

const EventEmmitter = require('events')
// const { error } = require('console')
class MyEmitter extends EventEmmitter{}
const myEmitter = new MyEmitter()

// console.log("import",add(2,3))

// setTimeout(()=>{
    
//     // logEvents()
// },2000)



myEmitter.on('log',(mes,fileName) => logEvents(mes,fileName))


const PORT = process.env.PORT|| 3700;
console.log(PORT)

const serveFile = async (filePath,contentType,response)=>{
    try{
        const rawdata = await fsPromises.readFile(
            filePath,
            !contentType.includes("image")?'utf8':''
        )
        const data = contentType==='application/json'?JSON.parse(rawdata):rawdata
        response.writeHead(
            filePath.includes('404.html')?404:200,
            {'content-Type':contentType})
        response.end(
            contentType==='application/json' ?JSON.stringify(data):data       ); 
    }catch(error){
        myEmitter.emit('log',`${error.name}\t${error.message}`,'reqlog.txt')
        response.statusCode= 500
        response.end()
    }
}

const server = http.createServer((req,resp)=>{
    console.log('wroking')
    console.log(req.url,req.method)
    myEmitter.emit('log',`${req.url}\t${req.method}`,'reqlog.txt')

    // let path;
    // if (req.url==='/'||req.url==='index.html'){
    //     resp.statusCode=200;
    //     resp.setHeader('Content-Type','text/html');
    //     path = path.join(__dirname,'views','index.html');
    //     fs.readFile(path, 'utf8',(data,erro)=>{
    //         resp.end(data)
    //     })
    // }

    const extension = path.extname(req.url);
    console.log(extension)
    let contentType;

    switch(extension){
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType='text/javascript';
            break;
        case '.json':
            contentType='application/json';
            break;
        case '.jpeg':
            contentType='image/jpeg';
            break;
        case '.png':
            contentType='image/png';
            break;

        case '.txt':
            contentType= 'text/plain';
            break;
        default:
        contentType ='text/html';
    }

    let filePath =
            contentType=== 'text/html' && req.url ==='/'
            ?path.join(__dirname,'views','index.html')
            :contentType==='text/html' &&req.url.slice(-1)==='/'
            ?path.join(__dirname,'views',req.url,'index.html')
            :contentType === 'text/html'
            ?path.join(__dirname,'views',req.url)
            :path.join(__dirname,req.url)

        console.log(filePath)
        // console.log(path.parse(filePath))
        // make the .html extention not required in the browser three
    if(!extension && req.url.slice(-1)!=='/' ) filePath +='.html';

    const fileExists = fs.existsSync(filePath)
    console.log(fileExists)

    if(fileExists){
        serveFile(filePath,contentType,resp)
    }else{
        switch(path.parse(filePath).base){
            case "old-page.html":
                resp.writeHead(301,{'location':'/new-page.html'});
                resp.end();
                break;
            case 'www-page.html':
                resp.writeHead( 301 ,{'location':'/'});
                resp.end();
                break;

            default:
                serveFile(path.join(__dirname,'views','404.html'),'text/html',resp);        
        }
        // console.log(filePath)
    }
})
server.listen(PORT, ()=>console.log(`serve runnig on port ${PORT}`))

