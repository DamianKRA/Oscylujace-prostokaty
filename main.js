const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight-7;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let tabBoxow = [];

class Box {
    constructor(x, width) {
        this.max = randomNumber(canvasHeight - 200, canvasHeight - 250);
        this.min = randomNumber(canvasHeight - 50, canvasHeight);
        this.x = x;
        this.y = Math.floor((this.max + this.min) / 2);
        this.width = width;
        this.frames = 0;
    }

    initFrames() {
        this.frames = 0 + Math.floor(Math.random() * 20) + 1;
    }

    draw() {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "orange";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(this.x, canvasWidth);
        ctx.lineTo(this.x + this.width, canvasWidth);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x, this.y);
        ctx.closePath();
        ctx.stroke();
        //ctx.fill();
    }

    update() {
        this.y = map(Math.sin(this.frames), -1, 1, this.max, this.min);

        if (Math.abs(this.y - this.max) < 1) {
            this.min = randomNumber(canvasHeight - 50, canvasHeight);
        } else if (Math.abs(this.y - this.min) < 1) {
            this.max = randomNumber(canvasHeight - 200, canvasHeight - 250);
        }
        this.frames += randomNumber(0.05, 0.1);
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function init() {
    let ile = 80;
    let boxWidth = canvasWidth / ile;

    for (let i = 0; i < ile; i++) {
        tabBoxow.push(new Box(boxWidth * i, boxWidth));
        tabBoxow[i].initFrames();
    }
}

init();

setInterval(() => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let x of tabBoxow) {
        x.draw();
        x.update();
    }
}, 1000 / 60);