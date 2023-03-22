import Robot from './clases/robot.js';
import Obstacle from './clases/obstacle.js';

const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

// Configuración del tamaño del lienzo
canvas.width = 1200;
canvas.height = 800;

// Configuración del color de fondo del lienzo
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);


const player = new Robot(100, 500, 5,0,0.5,500);
const obstaculos = [
  new Obstacle(300, 500, 50, 50,'red'),
  new Obstacle(300, 300, 50, 50,'red'),
  new Obstacle(700, 200, 50, 50,'red'),
]

// Llamar a la función update() del jugador en cada fotograma
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.width);

  player.update();
  // Llamar a la función update() en el siguiente fotograma
  for (let i = 0; i < obstaculos.length; i++) {
    const obstaculo = obstaculos[i];

    if (player.checkCollision(obstaculo)) {
      // Si hay colisión, decidir qué hacer
      if (player.y + player.height < obstaculo.y) {
        // Si el obstáculo es más alto que el robot, saltar
        player.jump()
      } else {
        // De lo contrario, detener el movimiento
        player.stop();
      }
    }
  }
  requestAnimationFrame(update);
}

// Llamar a la función draw() del jugador en cada fotograma
function draw() {

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  obstaculos.forEach((o)=>{
    o.draw(ctx);
  })

  // Llamar a la función draw() en el siguiente fotograma
  requestAnimationFrame(draw);
}
document.addEventListener("keydown", function(event) {
  player.handleKeyDown(event);
});

document.addEventListener("keyup", function(event) {
  player.handleKeyUp(event);
});

// Iniciar el juego llamando a las funciones update() y draw()
update();
draw();
