var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount=0
var gameState=0;
var car1, car2, track;
var cIMG1, cIMG2, tIMG;
var cars=[];
var allPlayers;
var reset, resetIMG
var obs1Img, obs2Img, fImg, cImg
var fuelGroup, coinGroup,obsGroup
var lImg

function preload() {
  backgroundImage = loadImage("assets/background.png");
  cIMG1 = loadImage("assets/car1.png")
  cIMG2 = loadImage("assets/car2.png")
  tIMG = loadImage("assets/track.jpg")
  resetIMG = loadImage("assets/reset.png")
  cImg = loadImage("assets/goldCoin.png")
  obs1Img = loadImage("assets/obstacle1.png")
  obs2Img = loadImage("assets/obstacle2.png")
  fImg = loadImage("assets/fuel.png");
  lImg = loadImage("assets/life.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getGameState()
  game.start();

}

function draw() {
  background(backgroundImage);
  if (playerCount == 2){
    game.updateGameState(1)
  }
  if(gameState == 1){
    game.play()
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
