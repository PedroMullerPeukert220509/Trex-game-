var trex, trex_img;
var bordas;
var chao;
var chaoImg
var chaoInvisivel
var nuvem
var imagemNuvem
var cacto
var score=0
var grupodecactos
var grupodenuvens
var JOGAR=1
var PERDER=2
var mododejogo=JOGAR
var mortedotrex
var gameover,restart,gameOver_img,restart_img
var somdepulo
var somdemorte
var somde100pontos
function preload() {
  //pre carregar as imagens,sons,etc
 obstacle1=loadImage("obstacle1.png")
 obstacle2=loadImage("obstacle2.png")
 obstacle3=loadImage("obstacle3.png")
 obstacle4=loadImage("obstacle4.png")
 obstacle5=loadImage("obstacle5.png")
 obstacle6=loadImage("obstacle6.png")
 mortedotrex=loadAnimation("trex_collided.png")
 gameOver_img=loadImage("gameOver.png")
 restart_img=loadImage("restart.png")

chaoImg=loadImage("ground2.png");

  trex_img = loadAnimation("trex3.png", "trex4.png");

 imagemNuvem=loadImage("cloud.png")

somdepulo=loadSound("jump.mp3")

somdemorte=loadSound("die.mp3")

somde100pontos=loadSound("checkPoint.mp3")

}

function setup() {
  createCanvas(600, 200);
  grupodecactos=new Group()
  grupodenuvens=new Group()
  //configuracoes do trex
  trex = createSprite(50, 100, 20, 20);
  trex.addAnimation("correndo", trex_img);
  trex.addAnimation("morrendo",mortedotrex);
  trex.scale = 0.5;
  //trex.debug liga e desliga a colisao 
  trex.debug=false
  //modifica a hitbox
  trex.setCollider("circle",0,0,30)
  bordas = createEdgeSprites();
  chao = createSprite(300, 190, 600, 20);
  
  chaoInvisivel = createSprite(300,200,600, 20);
  chaoInvisivel.visible = false
  chao.velocityX = -(5+score/100)
chao.addImage (chaoImg)
chao.x = chao.width/2

gameOver=createSprite(300,100)
restart=createSprite(300,150)
gameOver.addImage(gameOver_img)
restart.addImage(restart_img)
gameOver.visible = false
restart.visible = false
//var teste = Math.round( random(1,10))
//console.log(teste)


}

function draw() {
  background("white");

  text("score: "+score, 500,30)

   

// console.log(trex.y) //console
  //gravidade
  trex.velocityY = trex.velocityY + 1;
//colisao do trex com chao
  trex.collide(chaoInvisivel);
  

 


 if(mododejogo===JOGAR){

  score=score+Math.round(frameRate()/60)

  if(score%100===0&&score>0){

somde100pontos.play()

  }

  // pulo do trex
  if (keyDown("w") && trex.isTouching(chao)) {
    trex.velocityY = -15;

  somdepulo.play()
  } 
  gerarCactos()

  gerarNuvem()

  if(chao.x<0) {
    chao.x=chao.width/2
  
  }

if(trex.isTouching(grupodecactos)){

mododejogo=PERDER

somdemorte.play()

// trex.velocityY=-15

//somdepulo.play()

}

 }



 else if(mododejogo===PERDER){

grupodecactos.setLifetimeEach(-5)
grupodenuvens.setLifetimeEach(-5)
  chao.velocityX=0
  gameOver.visible = true
restart.visible = true
  grupodenuvens.setVelocityXEach(0)
 grupodecactos.setVelocityXEach(0)
 trex.changeAnimation("morrendo")
 if(mousePressedOver(restart)){

mododejogo=JOGAR

reset()

 }

 }
  drawSprites();
}
function gerarNuvem(){
 if(frameCount%60===0){
  nuvem=createSprite (610,100,20,20)
 nuvem.velocityX = -3

nuvem.lifetime= 210

 nuvem.addImage(imagemNuvem)

nuvem.scale=0.5
nuvem.y= Math.round(random(10,100))

//depth significa camada da imagem
nuvem.depth= trex.depth
trex.depth=trex.depth+1
grupodenuvens.add(nuvem)
}

}

function gerarCactos(){  

 if(frameCount%80===0) {

 cacto=createSprite (610,185)

 cacto.velocityX=-(5+score/100)

 var aleatorio= Math.round(random(1,6))

  switch(aleatorio){

case 1:cacto.addImage(obstacle1)

break;

case 2:cacto.addImage(obstacle2)

break;

case 3:cacto.addImage(obstacle3)

break;

case 4:cacto.addImage(obstacle4)

break;

case 5:cacto.addImage(obstacle5)

break;

case 6:cacto.addImage(obstacle6)

break;
  }
 
cacto.scale=0.5

cacto.lifetime= 130

grupodecactos.add(cacto)


}


}
function reset() {

grupodecactos.destroyEach()
 
grupodenuvens.destroyEach()
gameOver.visible = false
restart.visible = false
trex.changeAnimation("correndo")
score = 0
chao.velocityX = -5
}
