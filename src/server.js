import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

console.log("hello");
// const handleListen = () => console.log("Listening on http://localhost:3000");
const handleListen = () => console.log("Listening on http://localhost:3000, ws");

// app.listen(3000, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// const handleConnection=(socket)=>{
//     console.log(socket)
// }

function onSocketClose() {
    console.log("Disconnected from the Browser ❌");
}

// function onSocketMessage(message) {
//     console.log(message.toString('utf8'));
// }

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous"
    console.log("Connected to server");
    socket.on("close", onSocketClose);
    socket.on("message", (msg) => {
        const message = JSON.parse(msg.toString('utf8'));

        switch (message.type) {
            case "new_message": {
                sockets.forEach(aSocket => {
                    aSocket.send(`${socket.nickname} : ${message.payload}`);
                });
                break;
            }
            case "nickname": {
                socket["nickname"] = message.payload;
                console.log(message.payload);
                break;
            }
        }
        // socket.send(message.toString('utf8'));
    });
    // socket.send("hello?");
})

server.listen(3000, handleListen);