var dog, dogImage, happyDog, happyDogImg;
var food, foodStock;
var database;

function preload()
{
 dogImage = loadImage("images/dogImg.png");
 happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,250,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  
  fill("white");
  textSize(20);
  text("FOOD REMAINING:"+food,150, 100);
}

function readStock(data){
  food = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
      x = x - 1;
    }
  
  database.ref('/').update({
    food:x
  });
}
