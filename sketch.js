var monkey, monkey_running
var banana, bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var score1, ground;
var bgi, bg;
var health = 3;
var sound;


var _PLAY = 1;
var _END = 0;
var gameState = _PLAY;


function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgi = loadImage("bg.png");

  sound = loadSound('mixkit-big-wild-eagle-calling-70.wav');
}



function setup() {
  bg = createSprite(100,110);
  bg.addImage(bgi);
  bg.scale = 3;

  monkey = createSprite(80,390);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  monkey.visible = true;
  
  ground = createSprite(0, 400, 40000, 10);
 // ground.velocityX = -4;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score1 = 0;
  createCanvas(displayWidth, 400);
}


function draw() {
  background(255);
  
  if(gameState === _PLAY){
    if(keyDown("space") && monkey.y >= 310){
      monkey.velocityY = -12;
    }
   
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score1 = score1 + 1;
      sound.play();
    }
    
    if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
      health = health - 1;
      sound.play();
    } 
    if(health == 0){
      monkey.visible = false;
      gameState = _END;
    }

    createRock();
    createFood();
    monkey.velocityX = 10;
    camera.position.x =  monkey.x;
    camera.position.y = 200; 
    if(camera.position.x % 500 == 0) {
      bg.x = camera.position.x; 
    }
  }
  if(gameState === _END){
    textSize(10);
    text("GAME OVER!",200, 200);
    monkey.velocityX = 0;
  }

  if(ground.x>3000) {
    ground.x = 0; 
  }
  monkey.velocityY = monkey.velocityY + 0.8;  
  monkey.collide(ground);
  drawSprites();
  textSize(50);
  fill(0, 102, 153);
  text("Score: " + score1, monkey.x, 80);
  fill(0, 300, 153);
  text("Health: " + health, monkey.x+270, 80);
}

function createRock(){
  if(World.frameCount%90 === 0){
    var oImage = createSprite(monkey.x + 1100,380,20,20);
    oImage.addImage(obstacleImage);
    //oImage.velocityX=-8;
    oImage.setLifetime = 50;
    oImage.scale = 0.1;
  
  
    obstacleGroup.add(oImage)
  }
}

function createFood(){
  if(World.frameCount%90 === 0){
    var fImage = createSprite(monkey.x + 800,300,20,20);
    fImage.addImage(bananaImage);
    //fImage.velocityX=-8;
    fImage.setLifetime = 50;
    fImage.scale = 0.1;
  
    FoodGroup.add(fImage)
  }
}