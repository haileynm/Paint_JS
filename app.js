const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");

const INITTIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//canvas default color 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITTIAL_COLOR;
ctx.fillStyle = INITTIAL_COLOR;
ctx.lineWidth = 2.5;

//default 값 정하기
let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

//마우스 움직이는 동안 발생
function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  } else  {
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  //console.log(event);
  //console.log(event.target.value);
  
  //override
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if(filling === true) {
    filling = false;
    mode.innerText = "Fill";
    mode.style.backgroundColor = "white";
  } else {
    filling = true;
    mode.innerText = "Paint";
    mode.style.backgroundColor = "rgba(0,0,0,0.2)";
  }
}

//캔버스 사이즈보다 커야함
function handleCanvasClick() {
  //x, y, width, height
  if(filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  //canvas 데이터를 image로 얻기
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS🖌";
  link.click();
}

function saveBtnColorDown(event) {
  saveBtn.style.backgroundColor = "rgba(0,3,0,0)";
  }

function saveBtnColorUp(event) {
  saveBtn.style.backgroundColor = "white";
}



function handleResetClick(event) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function resetBtnColorDown(event) {
  resetBtn.style.backgroundColor = "rgba(0,3,0,0)";
  }

function resetBtnColorUp(event) {
  resetBtn.style.backgroundColor = "white";
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
  color.addEventListener("click", handleColorClick)
);

if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick)
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
  saveBtn.addEventListener("mousedown", saveBtnColorDown);
  saveBtn.addEventListener("mouseup", saveBtnColorUp);
}

if(resetBtn) {
  resetBtn.addEventListener("click", handleResetClick);
  resetBtn.addEventListener("mousedown", resetBtnColorDown);
  resetBtn.addEventListener("mouseup", resetBtnColorUp);
}