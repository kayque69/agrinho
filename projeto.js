let fruits = [];

function setup() {
  createCanvas(600, 400);
  // Cria frutas no campo
  for (let i = 0; i < 10; i++) {
    fruits.push({ x: random(50, 250), y: random(200, 350), collected: false });
  }
}

function draw() {
  background(220);
  
  // --- CAMPO --- //
  fill(120, 200, 120); // Verde mais suave
  rect(0, height/2, width/2, height/2);
  
  // Desenha árvore
  drawTree(100, height/2); // (x, base da árvore)
  
  // --- FRUTAS --- //
  for (let fruit of fruits) {
    if (!fruit.collected) {
      fill(255, 165, 0); // Laranja para frutas
      circle(fruit.x, fruit.y, 20);
    }
  }
}

function drawTree(x, y) {
  // Tronco (amarelo-escuro)
  fill(205, 133, 63); // Cor de madeira mais clara
  rect(x - 10, y - 80, 20, 80);
  
  // Folhagem (verde mais claro)
  fill(60, 179, 113); // Verde folha mais claro
  ellipse(x, y - 100, 60, 60); // Centro
  ellipse(x - 25, y - 90, 40, 40); // Esquerda
  ellipse(x + 25, y - 90, 40, 40); // Direita
  ellipse(x, y - 130, 50, 50); // Topo
}

function mouseClicked() {
  // Verifica se clicou em uma fruta
  for (let fruit of fruits) {
    if (dist(mouseX, mouseY, fruit.x, fruit.y) < 20) {
      fruit.collected = true;
    }
  }
}

let farmColor, cityColor;
let truckX = 0;

function setup() {
  createCanvas(800, 400);
  farmColor = color(120, 200, 120); // Verde mais suave para o campo
  cityColor = color(160, 100, 180); // Roxo suave para a cidade
}

function draw() {
  // Fundo com gradiente campo-cidade
  let bgColor = lerpColor(farmColor, cityColor, truckX / width);
  background(bgColor);
  
  drawFarm();  // Lado esquerdo (campo)
  drawCity();  // Lado direito (cidade)
  
  // Caminhão se move com sin() para efeito ondulado
  truckX += 1;
  let truckY = height/2 + sin(frameCount * 0.05) * 20;
  drawTruck(truckX, truckY);
  
  // Reinicia ao chegar na cidade
  if (truckX > width) truckX = -50;
}

// ---- FUNÇÕES DE DESENHO ---- //
function drawFarm() {
  // Céu do campo (gradiente azul suave)
  for (let y = 0; y < height/2; y++) {
    let skyColor = lerpColor(color(173, 216, 230), color(255), y / (height/2));
    stroke(skyColor);
    line(0, y, width/2, y);
  }
  
  // Gramado (verde mais suave)
  fill(60, 179, 113); // Verde mais claro para o gramado
  noStroke();
  rect(0, height/2, width/2, height/2);
  
  // Plantação (fileiras de "plantas")
  fill(50, 100, 50); // Verde mais escuro para plantas
  for (let x = 20; x < width/2; x += 30) {
    for (let y = height/2 + 10; y < height - 20; y += 20) {
      triangle(x, y, x - 10, y + 20, x + 10, y + 20);
    }
  }
  
  // Celeiro (vermelho mais suave com telhado)
  fill(205, 92, 92); // Vermelho mais suave
  rect(width/4 - 40, height/2 - 60, 80, 60);
  fill(160, 82, 45); // Telhado (marrom)
  triangle(width/4 - 60, height/2 - 60, width/4 + 60, height/2 - 60, width/4, height/2 - 100);
  
  // Sol (amarelo suave)
  fill(255, 255, 102); // Amarelo suave
  let sunY = height/4 + sin(frameCount * 0.02) * 10; // Flutua suavemente
  circle(width/6, sunY, 50);
}

function drawCity() {
  // Céu noturno (gradiente roxo e azul escuro)
  for (let y = 0; y < height/2; y++) {
    let nightColor = lerpColor(color(25, 25, 112), color(30, 0, 60), y / (height/2));
    stroke(nightColor);
    line(width/2, y, width, y);
  }
  
  // Estrada (cinza mais escuro)
  fill(70, 70, 70); // Estrada em cinza mais escuro
  rect(width/2, height/2 + 50, width/2, height/2 - 50);
  
  // Prédios (cinza com toques de roxo)
  for (let x = width/2 + 20; x < width - 20; x += 60) {
    let buildingHeight = random(80, 150);
    fill(random(60, 90), random(50, 80), random(100, 150)); // Tons de roxo e cinza
    rect(x, height/2 - buildingHeight, 40, buildingHeight);
    
    // Janelas (amarelas acesas)
    fill(255, 255, 150);
    for (let y = height/2 - buildingHeight + 10; y < height/2 - 10; y += 15) {
      rect(x + 5, y, 10, 8);
      rect(x + 25, y, 10, 8);
    }
  }
  
  // Lua (branca suave)
  fill(240);
  circle(width * 5/6, height/4, 40);
}

function drawTruck(x, y) {
  fill(200, 50, 50); // Vermelho mais suave
  rect(x, y, 60, 30); // Cabaça do caminhão
  fill(0);
  circle(x + 14, y + 30, 22); // Rodas
  circle(x + 50, y + 30, 20);
  fill(255);
  rect(x + 35, y - 10, 20, 10); // Carga (caixa branca)
}
