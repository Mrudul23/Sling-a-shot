const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var pig1,pig2;
var backgroundImg,platform;
var ball, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var chances = 1
var highscore = 0




function preload() {
    getBackgroundImg();
}

function setup(){

    canvas = createCanvas(1700,750);
    engine = Engine.create();
    world = engine.world;
  
    ground = new Ground(850,height+10,1700,20,PI/2);
    ground2 = new Ground(1700+10,height/2,20,750,PI/2)
    ground3 = new Ground(850,-10,1700,20,PI/2);
    ground4 = new Ground(-10,height/2,20,750,PI/2)



    basket1 = new Basket(1600,200)
    basket2 = new Basket(1500,350)
    basket3 = new Basket(1400,500)
    basket4 = new Basket(1300,650)


    ball = new Ball(170,580);

    slingshot = new SlingShot(ball.body,{x:170, y:580});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);

    if(!backgroundImg){
      text("reload the page once if you get a blank background",1000,30)
       background("grey")  
    }  
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  : " + score, 70, 40)
        text("Chance number : "+chances+"/10",70,70)
        text("Your highscore : "+highscore,70,100)


        noStroke();
        textSize(25)
        text("► Drag and release the mouse to shoot",1200,700)
        text("► Press space to get another chance",1200,740)

      if(score>highscore){
          highscore = score
      }
    
    Engine.update(engine);
     
    ball.display();

    basket1.display()
    basket2.display()
    basket3.display()
    basket4.display()
    textSize(35)
    text("500",1570,190)
    text("400",1470,340)
    text("200",1370,490)
    text("100",1270,640)


    
    slingshot.display();  
    
    if(ball.body.position.x > 1550 && ball.body.position.y > 150 && ball.body.position.x < 1650 && ball.body.position.y < 200 && gameState != "onSling" ){
        score+= 500 
        a()
    }

    if(ball.body.position.x > 1450 && ball.body.position.y > 300 && ball.body.position.x < 1550 && ball.body.position.y < 350 && gameState != "onSling" ){
        score+= 400
        a()
    }
    if(ball.body.position.x > 1350 && ball.body.position.y > 450 && ball.body.position.x < 1450 && ball.body.position.y < 500 && gameState != "onSling" ){
        score+= 200
        a()
    }
    if(ball.body.position.x > 1250 && ball.body.position.y > 600 && ball.body.position.x < 1350 && ball.body.position.y < 650 && gameState != "onSling" ){
        score+= 100
        a()
    }
    if(keyCode === 114 && gameState === "launched" && chances === 10){
        score = 0
        chances = 0
        Matter.Body.setPosition(ball.body, {x: 200 , y: 580});
        ball.trajectory = []
        slingshot.attach(ball.body);
        gameState = "onSling"
    }

    if(chances ===10){
      text("Well done you have scored " + score+" in 10 chances at an average of "+ Math.round(score/chances) +" per chance",200,320)
      text('Press "r" to restart the game',width/2-250,height/2)
      ball.trajectory = []
      Matter.Body.setPosition(ball.body, {x: 100 , y: 730});
      slingshot.fly();

    }
   
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(ball.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && gameState === "launched" && chances < 11 ){ 
       Matter.Body.setPosition(ball.body, {x: 200 , y: 580});
       ball.trajectory = []
       slingshot.attach(ball.body);
       gameState = "onSling"
       chances+= 1
    }
    
}




function a(){
    Matter.Body.setPosition(ball.body, {x: 100 , y: 580});
    ball.trajectory = []
   
}



async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=18){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.png";
    }

    backgroundImg = loadImage(bg);
}