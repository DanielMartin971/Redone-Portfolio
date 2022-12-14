//Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight

//Variables
let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = [
  '#00ace6',
  '#00cccc',
  '#4d94ff',
  '#404040',
  '#ff3300'
];


//Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  
  init();
});

//Utility Functions
function randomIntFromRange(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColors(colors){
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2){
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}


//Objects
function Particle(x, y, radius, color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distanceFromCenter = randomIntFromRange(50, 120);
  this.lastMouse = {
    x: x,
    y: y
  };
  
  this.update = () => {
    const lastPoint = {
      x: this.x,
      y: this.y
    };
    //Move points over time
    this.radians += this.velocity;
    
    //Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
    
    //This is Circular Motion
    //cos affects the X position
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    //sin affects the Y position
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint);
  };
  
  this.draw = lastPoint => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };
}

//Implementation
let particles;
function init(){
  particles = [];
  
  for(let i = 0; i < 100; i++){
    const radius = (Math.random() * 2) + 1;
    particles.push(new Particle(canvas.width/2, canvas.height/2, radius, randomColors(colors)));
  }
}

//Animation Loop
function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0, 0.05)';
  c.fillRect(0,0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
  });
}

init();
animate();








































