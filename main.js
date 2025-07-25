const speed = document.querySelector(".speed");
const bar = document.querySelector(".speed-bar");
const canvas = document.querySelector(".draw");
const frame = document.querySelector(".frame")
const ctx = canvas.getContext("2d");
const paintbrush = document.querySelector(".paint-brush");
const pen = document.querySelector(".pen");
const eraser = document.querySelector(".eraser");
const palette = document.querySelector(".palette");

canvas.width = frame.clientWidth;
canvas.height = frame.clientHeight;

// console.log(canvas.width, canvas.height);

ctx.strokeStyle = "red";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let mode = "paintbrush";


function draw(e)
{
    if(!isDrawing) return; //* stop the function
    if(mode === "paintbrush" || mode === "pen")
    {
        // if(mode === "pen") ctx.lineWidth = 5;
        // else ctx.lineWidth = 50;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    else{
        ctx.clearRect(e.offsetX - ctx.lineWidth / 2, e.offsetY - ctx.lineWidth / 2, ctx.lineWidth, ctx.lineWidth);
    }

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function handleMove(e)
{
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const min = 0.4;
    const max = 4;
    const height = Math.round(percent * 100) + "%";
    const lineWidth = percent * (max - min) + min;
    bar.style.height = height;
    bar.textContent = lineWidth.toFixed(2) + "x";
    ctx.lineWidth = lineWidth;
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

paintbrush.addEventListener("click", () => {mode = "paintbrush"; ctx.lineWidth = 50});
pen.addEventListener("click", () => {mode = "pen"; ctx.lineWidth = 5});
eraser.addEventListener("click", () => {mode = "eraser"});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);
speed.addEventListener("mousemove", handleMove);

