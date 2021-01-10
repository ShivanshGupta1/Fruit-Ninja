var knife, knifeImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0
var fruitGroup, enemyGroup;

var fruit,fruit1,fruit2,fruit3,fruit4;

var alien,alienMoving;

var gameOverImage;

function preload(){
  knifeImage = loadAnimation("sword.png");
  gameOverImage = loadAnimation("gameover.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alienMoving = loadAnimation("alien1.png","alien2.png")

  
  gameOverImage = loadImage("gameover.png")


 
}
function setup() {
  
  createCanvas(600, 600);
  
  knife = createSprite(50,180,20,20);
  knife.addAnimation("knife",knifeImage);
  knife.addAnimation("gameOver",gameOverImage)
  knife.scale = 0.7;
  
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}

function draw() {
  background("lightblue");
  text("Score: "+ score, 500,50);
  if (gameState==PLAY){
  fruits();
  Enemy();
    knife.y = World.mouseY;
    knife.x = World.mouseX;
  }
  if (knife.isTouching(fruitGroup)){
    score+=1
    fruitGroup.destroyEach();
  }
  if (knife.isTouching(enemyGroup)){
    gameState = END;
  }
  if(gameState==END){
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
    enemyGroup.setVelocityEach(0)
    fruitGroup.setVelocityEach(0)
    knife.changeAnimation("gameOver",gameOverImage)
  }
  drawSprites();
  
}

function fruits(){
  if (frameCount % 80 === 0){
   fruit = createSprite(400,200,20,20);
   fruit.scale = 0.2
   
   
    var randomNumber = Math.round(random(1,4));
    switch(randomNumber) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
    
    fruit.y = Math.round(random(50,340))
    fruit.setLifetime = 100;
    fruit.velocityX = -7;
   
    fruitGroup.add(fruit);
 }
}
function Enemy(){
  if (frameCount % 200 === 0){
   alien = createSprite(400,200,20,20);
   alien.addAnimation("alienMoving",alienMoving)
   
   alien.y = Math.round(random(100,300))
   alien.setLifetime = 50;
   alien.velocityX = -8;
   
   enemyGroup.add(alien);
 }
}