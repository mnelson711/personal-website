
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("drawing-board");
  const toolbar = document.getElementById("toolbar");
  const ctx = canvas.getContext("2d");

  const canvasOffsetX = canvas.offsetLeft;
  const canvasOffsetY = canvas.offsetTop;

  canvas.width = window.innerWidth - canvasOffsetX;
  canvas.height = window.innerHeight - canvasOffsetY;

  let isDrawing = false;

  toolbar.addEventListener("click", (e) => {
    if (e.target.id === "clear") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });

  toolbar.addEventListener("change", (e) => {
    if (e.target.id === "stroke") {
      ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === "lineWidth") {
      lineWidth = e.target.value;
    }
  });

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    draw(e);
  }

  function draw(e) {
    if (!isDrawing) return;

    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    // ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Send drawing data to the server
    console.log("X: ", JSON.stringify({ x, y }));
    ws.send(JSON.stringify({ x, y }));
  }

  function drawSocket(x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    // ctx.beginPath();
    // isDrawing = false;
    // ctx.closePath();
  }

  function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
  }

  // Receive data from the server
  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log("data: ", data.x);

    //draw received data
    // ctx.beginPath();
    drawSocket(data.x, data.y);

    // const Userx = e.clientX - canvas.getBoundingClientRect().left;
    // const Usery = e.clientY - canvas.getBoundingClientRect().top;
    // ctx.moveTo(Userx, Usery);
  });

  ws.addEventListener("open", () => {
    console.log("WebSocket connection opened");
  });

  ws.addEventListener("close", () => {
    console.log("WebSocket connection closed");
  });

  ws.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });

  function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode.apply(null, buffer);
    return btoa(binary);
  }
});