let canvasWidth = document.body.clientWidth - 10;
let canvasHeight = document.body.clientHeight - 10;
const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
document.body.appendChild(canvas);
let canvasCurrentHeight;
let canvasCurrentWidth;

const ctx = canvas.getContext('2d');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const square = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 50,
  color: '#1e88e5'
};

let enemy = {
  x: 15 + getRandomInt(50),
  y: 15 + getRandomInt(50),
  size: 30,
  color: '#f00'
};

let mouseX = 0;
let mouseY = 0;
const speed = 7;

function drawSquare() {
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x - square.size / 2, square.y - square.size / 2, square.size, square.size);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// let enemyX = getRandomInt(1500);
// let enemyY = getRandomInt(600);
// 
function drawEnemy() {
  ctx.fillStyle = '#f00';
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
  }
  
  function drawAim() {
    ctx.beginPath();
    ctx.moveTo(square.x, square.y);
    ctx.lineTo(mouseX, mouseY);
    ctx.moveTo(square.x, square.y);
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 3;
  ctx.stroke();
}
let step = 0;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //   const dx = mouseX - square.x;
  //   const dy = mouseY - square.y;
  //   const angle = Math.atan2(dy, dx);
  //   square.x += Math.cos(angle) * speed;
  //   square.y += Math.sin(angle) * speed;
  
  if (keys['a'] && square.x > 0+25) {
    square.x -= speed;
  } else if (keys['d'] && square.x < canvas.width-25) {
    square.x += speed;
  }
  
  if (keys['w'] && square.y > 0+25) {
    square.y -= speed;
  } else if (keys['s'] && square.y < canvas.height-25) {
    square.y += speed;
  }
  if(step < 100){
    enemy.x += 1;
    step +=1;
  } else if(step < 300){
    enemy.y +=2;
    step +=1;
  } else if(step < 500){
    enemy.x +=1;
    enemy.y -=1;
    step +=1;
  } else if(step < 700){
    enemy.x -= 1;
    enemy.y -= 2;
    step++
  } else if(step){

  } 
  
  drawSquare();
  drawAim();
  drawEnemy();
  
  requestAnimationFrame(update);
}

function onMouseMove(e) {
  mouseX = e.clientX - canvas.offsetLeft;
  mouseY = e.clientY - canvas.offsetTop;
}

function onKeyDown(e) {
  keys[e.key] = true;
}

function onKeyUp(e) {
  keys[e.key] = false;
}

const keys = {};

canvas.addEventListener('mousemove', onMouseMove);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

update();

document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

function checkPlayer(){
  canvasCurrentHeight = canvas.getAttribute('height');
  canvasCurrentWidth = canvas.getAttribute('width');
  if(square.x > canvasCurrentWidth){
    square.x = canvasCurrentWidth - 25;
  }
  if(square.y > canvasCurrentHeight){
    square.y = canvasCurrentHeight - 25;
  }
}
setInterval(checkPlayer, 10);
function limitEnemyMovement() {
  if (enemy.x <= 0) {
    enemy.x = 0;
  }
  if (enemy.x + enemy.size >= canvasCurrentWidth) {
    enemy.x = canvasCurrentWidth - enemy.size;
  }
  if (enemy.y <= 0) {
    enemy.y = 0;
  }
  if (enemy.y + enemy.size >= canvasCurrentHeight) {
    enemy.y = canvasCurrentHeight - enemy.size;
  }
}
setInterval(limitEnemyMovement, 10);