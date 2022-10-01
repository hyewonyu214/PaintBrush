const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
    isPainting=true;
}
function cancelPainting(){
    isPainting=false;
    ctx.beginPath();
}
function onLineWidthChange(event){
    ctx.lineWidth=event.target.value;
}

function oncolorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle= event.target.value;
}

function onColorClick(event){
    const colorValue= event.target.dataset.color
    ctx.strokeStyle = colorValue;
    ctx.fillStyle= colorValue;
    color.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling=false
        modeBtn.innerText="Fill";
    }else{
        isFilling=true
        modeBtn.innerText="Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle="white";
    isFilling = false
    modeBtn.innerText="Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change",oncolorChange);

colorOptions.forEach(color =>color.addEventListener("click", onColorClick))

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);



// 마우스가 움직일때매다 색깔을 다르게 그리기
// const colors = [
//     "#ff3838",
//     "#ffb8b8",
//     "#c56cf0",
//     "#ff9f1a",
//     "#fff200",
//     "#32ff7e",
//     "#7efff5",
//     "#18dcff",
//     "#7d5fff",
//   ];

// ctx.lineWidth=2;
// ctx.moveTo(0,0);

// function onclick(event){
//     ctx.beginPath();
//     ctx.moveTo(800,800);
//     const color = colors[Math.floor(Math.random() * colors.
//         length)];
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
// }
// canvas.addEventListener("mousemove", onclick)

// 사람만들기
// ctx.fillRect(201-40,200-20,15,100);
// ctx.fillRect(350-40,200-20,15,100);
// ctx.fillRect(260-40,200-20,60,200);

// ctx.arc(250,100,50,0,2 *Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle="white";
// ctx.arc(260+9,95,8,Math.PI,2 *Math.PI);
// ctx.arc(230+9,95,8,Math.PI,2 *Math.PI);
// ctx.fill();

// 집만들기
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);
// ctx.moveTo(200, 200);
// ctx.lineTo(325,100);
// ctx.lineTo(450,200);
// ctx.fill();

// move to: 선을 긋지 않으면서 연필을 종이의 다른 부분으로 움직임, lineto: 연필을 종이의 다른 부분으로 움직임
// ctx.moveTo(50,50);
// ctx.lineTo(150,50);
// ctx.lineTo(150,150);
// ctx.lineTo(50,150);
// ctx.lineTo(50,50);
// ctx.fill();

// 직사각형 왼쪽 맨끝에서 (x축,y축, 가로길이,세로길이) => ctx.rect(50, 50, 100, 100);

// ctx.fill(); -> 색채워 넣기, ctx.stroke(); -> 선만 있는것

// 위에 선들을 채우고 새 경로를 만들기: ctx.beginPath();
// 검은색 이였다가 5초 후에 빨간색으로 변경된다: setTimeout(()=>{ctx.fill();},5000);