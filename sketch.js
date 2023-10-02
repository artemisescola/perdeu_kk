let costas1, costas2;
let quieto, farra1, farra2;
let olhando, gameover;
let ponto;
var time = 0;

let situacao = "olhando";
let proximaAlteracao = 0;

let giz, grito;

const CADEIRAS_Y = 460;

function preload() {
  costas1 = loadImage("costas1.jpg");
  costas2 = loadImage("costas2.jpg");
  olhando = loadImage("olhando.jpg");
  gameover = loadImage("gameover.jpg");
  ponto = 0;

  quieto = loadImage("quieto.jpg");
  farra1 = loadImage("farra1.jpg");
  farra2 = loadImage("farra2.jpg");

  giz = loadSound("giz.mp3");
  giz.setLoop(true)
  grito = loadSound("grito.mp3");
  grito.setLoop(true)
}

function setup() {
  createCanvas(1024, 576);
}

function troca() {
  if (situacao === "olhando") {
    situacao = "não olhando";
    giz.play();
  } else {
    situacao = "olhando";
    giz.pause();
  }
  proximaAlteracao = millis() + random(2500, 7000);
}

function draw() {
  if (millis() > proximaAlteracao) {
    troca();
  }

  if (situacao === "olhando") {
    image(olhando, 0, 0);
  } else {
    let tempo = millis() % 1000;
    if (tempo > 500) {
      image(costas2, 0, 0);
    } else {
      image(costas1, 0, 0);
    }
  }

  if (mouseIsPressed || touches.length > 0 || keyIsPressed) {

    if(estaBaguncando === false){
      grito.play();
      estaBaguncando = true;      
    }

    if(situacao == "olhando"){
      image(gameover, 0, 0);
    }

    // Estudante 1
    let tempo = millis() % 1200;
    if (tempo > 400) {
      image(farra1, 50, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    } else {
      image(farra2, 50, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    }

    // Estudante 2
    tempo = millis() % 800;
    if (tempo > 400) {
      image(farra1, 150, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    } else {
      image(farra2, 150, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    }

    // Estudante 3
    tempo = millis() % 900;
    if (tempo > 450) {
      image(farra1, 250, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    } else {
      image(farra2, 250, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    }

    if(situacao === "olhando"){
      textSize(64);
      fill("red");
      textAlign(CENTER, CENTER);
      text("PERDEU KK", width / 2, height / 2);
      giz.stop()
      grito.stop();
      noLoop();
    }
    if (estaBaguncando ===true){
      ponto = ponto+1;
      
    if(ponto > 200)
      ponto = 201
      
    if(ponto > 0){
      textSize(32);
      fill('blue');
      textAlign(LEFT, LEFT);
      text(ponto, 100, 100);
    }
      
    if(ponto > 200){
      textSize(64);
      fill('yellow')
      textAlign(CENTER, CENTER);
      text("VITÓRIA", width / 2, height / 2);
    }
    }

  } else {
    grito.pause();
    estaBaguncando = false;

    // Adicionando os três estudantes lado a lado
    image(quieto, 50, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    image(quieto, 150, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
    image(quieto, 250, CADEIRAS_Y, 100, 160, 180, 100, 450, 720);
  }
  
}