
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY=0;
var END=1;
var gameState=PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   player= createSprite(200,360,20,50);
player.addAnimation("monkey",monkey_running);


//scale and position the trex
player.scale = 0.09;
player.x = 50;

//create a ground sprite
 ground = createSprite(200,380,1000,20);
ground.x = 50;

//invisible Ground to support 
 invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;


 rocksGroup = createGroup();
 bananaGroup = createGroup();


  
}

var count=0
function draw() {
  //set background to white
  background("white");
  //display score
  text("Survival Time: "+ count, 200, 100);
  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = Math.round(World.frameCount/3)+count;
    
    
    if (ground.x < 0){
      ground.x = 500;
    }
    
     //jump when the space key is pressed
    if(keyDown("space")){
      player.velocityY = -12 ;
    }
  
    //add gravity
    player.velocityY = player.velocityY + 0.8;
    
    
    spawnbananas();
  
    
    spawnObstacles();
    
    
    if(rocksGroup.isTouching(player)){
      gameState = END;
    }
  }
  
  else if(gameState === END) {
    
    ground.velocityX = 0;
    player.velocityY = 0;
    rocksGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    
    
    rocksGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    
  }
  
  
  
  player.collide(ground);
  
  drawSprites();
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var rock = createSprite(400,365,10,40);
    rock.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    rock.addAnimation("Stone",obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    rock.scale = 0.09;
    rock.lifetime = 70;
    //add each obstacle to the group
    rocksGroup.add(rock);
  }
}

function spawnbananas() {

  if (World.frameCount % 60 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = Math.round(random(10,320));
    banana.addAnimation("Banana",bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = player.depth;
    player.depth = player.depth + 1;
    
   
    bananaGroup.add(banana);
  }
  
}







