var guns
var score
var PLAY
var END
var gameState = PLAY
function preload(){
  gb = loadImage("goodboy1.png")
  bd = loadImage("badboy1.png")
  gun = loadImage("Gun1.png")
  gold = loadImage("gold.png")
  bulleti = loadImage("bullet.png")
  backgroundi = loadImage("war.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  
  guns = createSprite(30,200,10,10)

  guns.addImage(gun);
  guns.scale = 0.05
  bulletgroup = new Group();
  goodgroup = new Group();
  badgroup = new Group();

  score = 0
}

function draw() {
  background(backgroundi);

  Edge = createEdgeSprites();


 if (keyWentDown("RIGHT_ARROW")){
   bulletf();
 }
  if (frameCount%Math.round(random(50,100)) == 0){
    goodboy();
  }
  
  if (frameCount%Math.round(random(100,200)) == 0){
    badboy();
  }

  if (bulletgroup.isTouching(goodgroup)){
    score = score -1
    bulletgroup.destroyEach();
    goodgroup.destroyEach();
  }

  if (badgroup.isTouching(guns)){
    score = score-0.1
  }

  if (badgroup.isTouching(Edge[0])){
    score = score-1;
  }

  if (bulletgroup.isTouching(badgroup)){
    score = score +1
    bulletgroup.destroyEach();
    badgroup.destroyEach();
  }

  if (badgroup.isTouching(guns)){
    score = score-1;
  }

  if (score < 0&&gameState == PLAY){
    gameState = END
    guns.destroy();
    badgroup.destroyEach();
    goodgroup.destroyEach();
    bulletgroup.destroyEach();
    fill(255,0,0)
    textSize(25)
    stroke("black")
    text("GAME OVER",windowWidth/2,windowHeight/2)
  }
  fill(255,0,0)
  textSize(25)
  stroke("red")
  text("score:"+Math.round(score),windowWidth/2,20)
    guns.y = mouseY
  drawSprites();


}

function bulletf(){
  var bullet = createSprite(10,guns.y,20,200)
  bullet.addImage(bulleti)
  bullet.scale = 0.05
  bullet.velocityX = 10
  bullet.lifetime = windowWidth/10
  bulletgroup.add(bullet);
}

function goodboy(){
  var goodb = createSprite(windowWidth-10,Math.round(random(10,windowHeight-10)),10,10)
  goodb.addImage(gb)
  goodb.scale = 0.3
  goodb.velocityX = -10
  goodb.lifetime = windowWidth/-10
  goodgroup.add(goodb)
}

function badboy(){
  var badb = createSprite(windowWidth-10,Math.round(random(10,windowWidth-10)),10,10)
  badb.addImage(bd)
  badb.scale = 0.3
  badb.velocityX = windowWidth/-10
  badb.lifetime = 40
  badgroup.add(badb)

}





