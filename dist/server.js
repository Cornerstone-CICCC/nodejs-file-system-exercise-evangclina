"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Check the README.md file for instructions to the exercise
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const directory = "dist";
const server = http_1.default.createServer((req, res) => {
    const imagePath = path_1.default.join(directory, "/images/veryhappydog.jpg");
    //view dog image 
    if (req.url === "/view-image") {
        fs_1.default.readFile(imagePath, (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end(`Image could not be loaded :(`);
                return;
            }
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.write(data);
            res.end();
        });
        return;
    }
    //404 not found
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`
        <h1>Page not found :(</h1>
        <img src="https://media.tenor.com/OgIQVzGLDiQAAAAM/annoyed.gif" alt="sad gif">
        `);
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
