const socket = new WebSocket(`ws://${window.location.host}`);
socket.addEventListener("open",()=>{
    console.log("Connected to Browser");
})

socket.addEventListener("message",(message)=>{
    console.log("Just got ",message.data," from the server");
    console.log("msg", message);
})

socket.addEventListener("close",()=>{
    console.log("Disconnected from Server");
});

setTimeout(()=>{
    socket.send("hello from browser");
},5000);
