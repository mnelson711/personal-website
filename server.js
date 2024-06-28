const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const path = require('path');
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, "public"); 
app.use(express.static(publicPath));


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

app.get("/home", (req, res) => {
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

app.get("/machinelearning", (req, res) => {
  // Serve your HTML file
  fs.readFile("machinelearning.html", "utf8", (err, content) => {
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

app.get("/AQI", (req, res) => {
  // Serve your HTML file
  fs.readFile("aqiPaper.html", "utf8", (err, content) => {
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

app.get("/trivia", (req, res) => {
  // Serve your HTML file
  fs.readFile("trivia.html", "utf8", (err, content) => {
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

app.get("/jokes", (req, res) => {
  // Serve your HTML file
  fs.readFile("joke.html", "utf8", (err, content) => {
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

app.get("/snake", (req, res) => {
  // Serve your HTML file
  fs.readFile("snakegame.html", "utf8", (err, content) => {
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

app.get("/hangman", (req, res) => {
  // Serve your HTML file
  fs.readFile("hangman.html", "utf8", (err, content) => {
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

app.get("/pong", (req, res) => {
  // Serve your HTML file
  fs.readFile("pong.html", "utf8", (err, content) => {
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
const wss = new WebSocket.Server({ server });
wss.on("connection", (socket) => {
  console.log("New connection");

  socket.on("message", (data) => {
    const message = data instanceof Buffer ? data.toString("utf-8") : data;

    try {
      // const parsedData = JSON.parse(message);

      wss.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          // client.send(JSON.stringify(parsedData));
          client.send(message);
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


//Rock Paper Scissors Multiplayer
const RPSio = socketIO(server);
const rooms = {};

RPSio.on("connection", (socket) => {
  console.log("A user connected");

  // Handle joining a room
  socket.on("joinRoom", (roomId) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: [socket.id],
        choices: {},
      };
      socket.join(roomId);
      RPSio.to(roomId).emit("message", "Waiting for an opponent to join...");
    } else if (rooms[roomId].players.length === 1) {
      rooms[roomId].players.push(socket.id);
      socket.join(roomId);
      RPSio.to(roomId).emit("message", "Both players joined! Make your choice.");
    } else {
      socket.emit("message", "Room is full. Please try another room.");
    }
  });

  // Handle player choice
  socket.on("makeChoice", (data) => {
    const { roomId, choice } = data;
    rooms[roomId].choices[socket.id] = choice;

    if (Object.keys(rooms[roomId].choices).length === 2) {
      const player1Choice = rooms[roomId].choices[rooms[roomId].players[0]];
      const player2Choice = rooms[roomId].choices[rooms[roomId].players[1]];

      // Determine winner
      let winner;
      if (player1Choice === player2Choice) {
        winner = "It's a tie!";
      } else if (
        (player1Choice === "rock" && player2Choice === "scissors") ||
        (player1Choice === "paper" && player2Choice === "rock") ||
        (player1Choice === "scissors" && player2Choice === "paper")
      ) {
        winner = `Player ${
          socket.id === rooms[roomId].players[0] ? "1" : "2"
        } wins!`;
      } else {
        winner = `Player ${
          socket.id === rooms[roomId].players[1] ? "1" : "2"
        } wins!`;
      }

      RPSio.to(roomId).emit("gameResult", {
        winner,
        choices: rooms[roomId].choices,
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/rockpaperscissors", (req, res) => {
  // Serve your HTML file
  fs.readFile("rps.html", "utf8", (err, content) => {
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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
