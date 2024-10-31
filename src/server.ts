// Check the README.md file for instructions to the exercise
import path from "path"
import fs from "fs"
import http from "http"


const directory = "dist"
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

    const imagePath = path.join(directory, "/images/veryhappydog.jpg")

    //view dog image 
    if(req.url === "/view-image"){
        fs.readFile(imagePath, (err, data) => {
            if(err){
                console.error(err)
                res.writeHead(500, {"Content-Type": "text/plain"})
                res.end(`Image could not be loaded :(`)
                return
            }
            res.writeHead(200, {"Content-Type": "image/jpeg"})
            res.write(data)
            res.end()
        })
        return
    }


    //404 not found
    res.writeHead(404, { "Content-Type": "text/html"})
    res.end(`
        <h1>Page not found :(</h1>
        <img src="https://media.tenor.com/OgIQVzGLDiQAAAAM/annoyed.gif" alt="sad gif">
        `)
})

const PORT: number = 3000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})