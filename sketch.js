var Trex, TrexRunning, TrexCollided, Ground, Ground2, Ground3,count,obstaclesgroup,croudsgroup,cloudimage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,gamestate,restart,gameover,restartimage,gameoverimage;
 var PLAY = 1;
 var END = 0;
 var gamestate = PLAY;

function preload(){
 TrexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  TrexCollided = loadImage("trex_collided.png")
  Ground3 = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png");
   obstacle2 = loadImage("obstacle2.png");
 obstacle3 = loadImage("obstacle3.png"); 
   obstacle4 = loadImage("obstacle4.png")
   obstacle5 = loadImage("obstacle5.png")
   obstacle6 = loadImage("obstacle6.png")
  cloudimage = loadImage("cloud.png")
  restartimage = loadImage("restart.png");
  gameoverimage = loadImage("gameOver.png")
}
function setup() {
  createCanvas(600, 200);
  Trex = createSprite(50,180,20,50);
  Trex.addAnimation("running",TrexRunning);
  Trex.addAnimation("collided",TrexCollided);
  Trex.scale = 0.5;
  Ground = createSprite(200,180,400,20)
  Ground.addImage("Ground",Ground3);
  Ground2 = createSprite(200,185,400,5);
  Ground2.visible = false;
  
  obstaclesgroup = new Group();
  cloudsgroup = new Group();
  count = 0
  restart = createSprite(55,75,10,10);
  gameover = createSprite(190,30,20,20);
  restart.addImage(restartimage);
  gameover.addImage(gameoverimage)
  restart.scale = 0.75;
  gameover.scale = 0.75;
  
  
  
  
}

function draw() {
  background(255)
  if(gamestate === PLAY){
  restart.visible = false;
    gameover.visible = false;
    if (keyDown("space") && Trex.y >=159 ){
   Trex.velocityY = -11.5;  
  }
    Ground.velocityX =  -(6 + 2*count/100 );
    count = count+1;
    spawnclouds();
  spawnobstacles();
  Trex.velocityY = Trex.velocityY + 0.8;
  if (Ground.x < 0){
  Ground.x = Ground.width/2;
  }
    if( obstaclesgroup.isTouching(Trex)){
       gamestate=END;
       }
    
}
  
  if( gamestate === END){
  restart.visible = true;
    gameover.visible = true;
    Ground.velocityX = 0;
    Trex.velocityY= 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    Trex.changeAnimation("collided",TrexCollided)
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
  }
  Trex.collide(Ground2);
   
  
  
  text("Score: "+ count, 250, 100)
  
  drawSprites();
  
}
function spawnclouds(){
   if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloudsgroup.add(cloud)
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = Trex.depth;
    Trex.depth = Trex.depth + 1;
}
}
function spawnobstacles(){
   if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
        switch(rand){
 case 1: obstacle.addImage(obstacle1);
        break;
case 2: obstacle.addImage(obstacle2);
        break;
case 3: obstacle.addImage(obstacle3);
        break;
case 4: obstacle.addImage(obstacle4);
        break;
case 5: obstacle.addImage(obstacle5);
        break;
case 6: obstacle.addImage(obstacle6);
        break;
default: break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
     obstaclesgroup.add(obstacle)
  }

}
function reset(){
gamestate=PLAY;
obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  Trex.changeAnimation("running",TrexRunning);
 count = 0;
  

}