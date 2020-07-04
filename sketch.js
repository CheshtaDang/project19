//Global Variables
var player, player_running;
var banana, obstacles;
var banana_img, obstacles_img;
var obstaclesGroup,foodGroup;
var ground,ground_img;
var bg,bg_img;
var score;

function preload(){
  bg_img = loadImage("jungle.jpg");
 // ground_img = loadImage("ground.jpg");
  player_running =
 loadAnimation("Monkey_03.png","Monkey_02.png","Monkey_01.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("Banana.png");
  obstacles_img = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  bg = createSprite(0,0,600,300);
  bg.addImage("bg",bg_img);
  bg.x = bg.width/2;
  bg.velocityX = -3;
  bg.scale = 1.5;
  ground = createSprite(300,280,600,10);
 // ground.addImage("ground",ground_img);
  ground.x = ground.width/2; 
  ground.velocityX = -2;
  //ground.scale = 0.8;
  ground.visible = false;
  
  player = createSprite(50,250,20,10);
  player.addAnimation("running",player_running);
  player.scale = 0.1;
  
  score = 0;
 
  obstaclesGroup = new Group();
  foodGroup = new Group();
}

function draw(){
 background(100); 
   if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if (bg.x < 0){
    bg.x = bg.width/2;
  }
   if(keyDown("space")){
    player.velocityY = -12;
  }
   
  player.velocityY = player.velocityY+0.6;
  spawnFood();
  
  spawnObstacles();
 
   if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score+2;
  }
  if(obstaclesGroup.isTouching (player)){
    player.scale=0.06;
  }
  
  switch(score){
    case 10: player.scale = 0.14;
      break;
    case 20: player.scale = 0.16;
      break;
    case 30: player.scale = 0.18;
      break;
    case 40: player.scale = 0.20;
      break;
  }
  player.collide(ground);
  
  drawSprites(); 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :"+ score,400,60);
}
function spawnFood(){
  if(frameCount % 80===0){
    var banana = createSprite(500,600,50,10);
    banana.y = random(120,200);
    banana.addImage(banana_img);
    banana.scale = 0.04;
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth+2;
    foodGroup.add(banana);
  }
}
function spawnObstacles(){
  if(frameCount % 80===0){
    var obstacles = createSprite(600,250,50,10);
   // obstacles.y = random(120,200);
    obstacles.addImage(obstacles_img);
    obstacles.scale = 0.1;
    obstacles.velocityX = -5;
    obstacles.lifetime = 300;
    player.depth = obstacles.depth+2;
    obstaclesGroup.add(obstacles);
  }
}