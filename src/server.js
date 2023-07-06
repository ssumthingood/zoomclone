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
const wss = new WebSocket.Server({server});

// const handleConnection=(socket)=>{
//     console.log(socket)
// }

wss.on("connection", (socket)=>{
    console.log("Connected to server");
    socket.on("close",()=>{console.log("Disconnected from Browser")});
    socket.on("message",(message)=>{
        console.log(message);
    })
    socket.send("hello?");
})

server.listen(3000,handleListen);