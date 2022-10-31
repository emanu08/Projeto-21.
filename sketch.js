var greencar, path;
var coins, diamond;
var hen, pig;
var gameover ;

var greencarImg,coinsImg,diamondImg,henImg,pigImg,gameoverImg, pathImg ;
var END = 0;
var PLAY = 1;
var gameOver, restart;
var gameState = PLAY ;
var pontos;


function preload(){
 greencarImg = loadImage("greencar.png.png");
 coinsImg = loadImage("coins.png.png");
 diamondImg = loadImage("diamond.png.png");
 henImg = loadImage("hen.png.png");
 pigImg = loadImage("pig.png.png");
 pathImg = loadImage("Estrada.png.png");
 gameoverImg = loadImage("gameover.png.png");
}


function setup() {

createCanvas(1200,300);
// Movendo o fundo
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityY = -6;

greencar = createSprite(70,150);
greencar.addImage(greencarImg);
greencar.scale=0.07;
  

greencar.setCollider("rectangle",0,0,greencar.width , greencar.height);
greencar.debug = true ;

score = 0;
  
gameover = createSprite(650,150);
gameover.addImage(gameoverImg);
gameover.scale = 0.6;
gameover.visible = false;  

pigG = new group;
henG = new group;
coinsG = new group;
diamondG = new group;
 
}

function draw() {
 background(0);

 drawSprites();
 textSize(20);
 fill(255);
 text("PONTOS: "+ pontos,900,30);
  
 if(gameState === PLAY){

  greencar.x = World.mouseX;

  edges= createEdgeSprites();
  greencar.collide(edges);
 
  if(path.x < 0 ){
    path.x = width/2;
  }
  var select_obstacle = Math.round(random(1,4));

  if (World.frameCount % 150 == 0) {
    if (select_obstacle == 1) {
      pig();
    } else if (select_obstacle == 2) {
      hen();
    } else if(select_obstacle == 3) {
      coins();
    } else{
      diamond();
    }
  }
  
  if(pigG.isTouching(greencar)){
    gameState = END;
    greencard.velocityX = 0;
   }

   if(henG.isTouching(greencar)){
    gameState = END;
    greencard.velocityX = 0;
   }

   if(coinsG.isTouching(greencar)){
    pontos = pontos+1 ;
   }
  
  if(diamondG.isTouching(greencar)){
    pontos = pontos+1;
  }
  



} else if (gameState === END) {
  gameover.visible = true ;
  text("pressione espaço para reiniciar" ,450,200);
  gameover.addAnimation("gameoverImg");
  path.velocityX = 0;
  greencar.velocityX = 0;
  greencar.addAnimation("greencarImg");

  pigG.setVelocityXEach(0);
  pigG.setLifetimeEach(-1);

  henG.setVelocityXEach(0);
  henG.setLifetimeEach(-1);

  coinsG.setVelocityXEach(0);
  coinsG.setLifetimeEach(-1);

  diamondG.setVelocityXEach(0);
  diamondG.setLifetimeEach(-1);



  if(keyDown("space")){
    reset();
  }

}

function pig(){
  pig =createSprite(1100,Math.round(random(50, 250)));
  pig.scale =0.05;
  pig.addImage("pigImg");
  pig.setLifetime=170;
  pigG.add(pig); 
}

function hen(){
  hen =createSprite(1100,Math.round(random(50, 250)));
  hen.scale =0.05;
  hen.addImage("henImg");
  hen.setLifetime=170;
  henG.add(hen); 
}

function coins(){
  coins =createSprite(1100,Math.round(random(50, 250)));
  coins.scale =0.06;
  coins.addImage("coinsImg");
  coins.setLifetime=170;
  coinsG.add(coins); 
}

function diamond(){
  diamond =createSprite(1100,Math.round(random(50, 250)));
  diamond.scale =0.06;
  diamond.addImage("diamondImg");
  diamond.setLifetime=170;
  diamondG.add(diamond); 
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    pigG.destroyEach();
    henG.destroyEach();
    coinsG.destroyEach();
    diamondG.destroyEach();
    pontos = 0 ;
}   

}