var ground,roadImg;
var boy,boyImg,restart;
var coinImg,boyImg,gameOverImg;
var score=0

var gameState="start";
var text1="Press SPACE to restart the game"

function preload(){
  stopBoyImg=loadAnimation("Runner-1.png");
  roadImg=loadImage("Road.png");
  boyImg=loadAnimation("Runner-1.png","Runner-2.png");
  coinImg=loadImage("coin_gold.png");
  obstacleImg=loadImage("retroaliens_19.png");
  gameOverImg=loadAnimation("gameOver.png");
  diamondImg=loadImage("diamond1.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  restartImg=loadImage("restart.png");
}

function setup(){
  createCanvas(450,550)
  
  ground= createSprite(200,200);
  ground.addImage("ground",roadImg);
  ground.velocityY=3;
  
  boy=createSprite(200,500,20,20)
  boy.addAnimation("boy",boyImg)
  boy.scale=0.08
  
  text1.visible=false;
  
  coins=new Group()
  diamonds=new Group()
  obstacles=new Group()
}

function draw(){
   background(0);
  if(gameState==="start"){
    //boy.addAnimation("boy",stopBoyImg)
    if(keyDown("enter")){
      gameState="play";
    }
  }
  if(gameState==="play"){
   
    boy.x=mouseX
  
    edge=createEdgeSprites()
    boy.collide(edge[3])
  
    if(ground.y > 400 ){
    ground.y = height/2;
  }
  
    spawncoins();
    spawnDiamond();
    spawnObstacle();
  
  if(keyDown("UP_ARROW")){
      boy.velocityY=-15;
      jumpSound.play()
    }
   boy.velocityY=boy.velocityY+1
    
    if(coins.isTouching(boy)){
      score=score+10
      coins.destroyEach()
    }else if(diamonds.isTouching(boy)){
      score=score+20
      diamonds.destroyEach();
    }else if(obstacles.isTouching(boy)){
      gameState="end"
      dieSound.play();
    }
  }
      
      
      
      if(gameState==="end"){
        
        boy.addAnimation("boy",gameOverImg)
        boy.x=225
        boy.y=210
        boy.scale=0.8;
        
        ground.velocityY=0
        
        text1.visible=true;
        
        coins.destroyEach();
        diamonds.destroyEach();
        obstacles.destroyEach();

        coins.setVelocityYEach(0);
        diamonds.setVelocityYEach(0);
        obstacles.setVelocityYEach(0);
        
        
    if(keyDown("space")) {
      reset();
    }
        
    }
  
  drawSprites();
  
  if(gameState==="end"){
       textSize(25)
       fill("black")
       text("Press SPACE bar to restart",70,280)
     }
  if(gameState==="start"){
    textSize(20)
    fill("blue")
    text("This is a treasure hunting game",70,200)
    text("You have to collect the coins and diamonds",30,240)
    text("Be aware from monsters",90,280)
    fill("yellow")
    text("Press ENTER to start the game",70,320)
  }
 
  textSize(20);
  fill("red");
  text("Score: "+ score,160,50);
  fill("yellow")
  text("Virendra's Game",130,20)
  
  
}

function spawncoins(){
  if(frameCount%150===0){
    var coin=createSprite(Math.round(random(40,500)),0,20,20)
    coin.addImage("coin",coinImg)
    coin.scale=0.5
    coin.velocityY=2
    coin.lifetime=275;
    coins.add(coin)
  }
}

function spawnDiamond(){
  if(frameCount%450===0){
    var diamond=createSprite(Math.round(random(50,500)),0,20,20)
    diamond.addImage("diamond",diamondImg)
    diamond.scale=0.1
    diamond.velocityY=2
    diamond.lifetime=275
    diamonds.add(diamond)
  }
}

function spawnObstacle(){
  if(frameCount%250===0){
     var obstacle=createSprite(Math.round(random(50,500)),0,20,20)
     obstacle.addImage("barrier",obstacleImg)
     obstacle.scale=0.2
     obstacle.velocityY=6
     obstacle.lifetime=275
     obstacles.add(obstacle)
     }
}

function reset(){
  gameState = "play";
  boy.addAnimation("boy",boyImg);
  boy.scale=0.08;
  ground.velocityY=3;
  text1.visible=false;
  diamonds.destroyEach(); 
  obstacles.destroyEach();
  coins.destroyEach();
  
  score = 0;
}