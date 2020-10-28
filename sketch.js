var dog, happyDog, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogHImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(width/2, 350);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() { 
  background(46, 139, 87); 

  if(keyWentDown("space") && x !== "undefined") {
    writeStock(foodS);
    dog.addImage(dogHImg);
  }

  drawSprites();
  
  textSize(20);
  fill(0);
  text("You have to press SPACE to feed drago the dog", width/11, width/11);

}


function readStock (data) {
  foodS = data.val();
}

function writeStock (x) {

  if(x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}



