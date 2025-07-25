const speed = document.querySelector(".speed");
const bar = document.querySelector(".speed-bar");
const canvas = document.querySelector(".draw");
const frame = document.querySelector(".frame")
const ctx = canvas.getContext("2d");

canvas.width = frame.clientWidth;
canvas.height = frame.clientHeight;

// console.log(canvas.width, canvas.height);

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e)
{
    if(!isDrawing) return; //* stop the function
    console.log(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

