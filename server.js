const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const path = require('path');
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, "public"); 
app.use(express.static(publicPath));

app.get("/draw", (req, res) => {
  // Serve your HTML file
  fs.readFile("draw.html", "utf8", (err, content) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

app.get("/", (req, res) => {
  // Serve your HTML file
  fs.readFile("index.html", "utf8", (err, content) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

app.get("/resume", (req, res) => {
  // Serve your HTML file
  fs.readFile("resume.html", "utf8", (err, content) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});


app.get("/projects", (req, res) => {
  // Serve your HTML file
  fs.readFile("projects.html", "utf8", (err, content) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

app.get("/chatroom", (req, res) => {
  // Serve your HTML file
  fs.readFile("chatroom.html", "utf8", (err, content) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});

wss.on("connection", (socket) => {
  console.log("New connection");

  socket.on("message", (data) => {
    const message = data instanceof Buffer ? data.toString("utf-8") : data;

    try {
      const parsedData = JSON.parse(message);

      wss.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedData));
        }
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
});

//chatroom stuff
const chatroomIO = socketIO(server);

chatroomIO.on("connection", (socket) => {
  console.log("A user connected");

  // Handle room joining
  socket.on("join", (room) => {
  socket.join(room);
  console.log(`User joined room ${room}`);

  // Handle incoming messages within the room
  socket.on("message", (data) => {
    chatroomIO.to(room).emit("message", data);
  });

  // Handle disconnection within the room
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
