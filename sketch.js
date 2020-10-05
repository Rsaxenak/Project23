var helicopterIMG, helicopterSprite, helicopterState, packageSprite,packageIMG;
var packageBody, box_Down, ground, holder1, holder2, holder3;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine, world;
var edges;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	helicopterState = "Fly";

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	holder1 = new Holder(200,600,20,50);


	engine = Engine.create();
	world = engine.world;

	var package_options = 
	{
		restitution:0.3,
		density:1.0,
		friction:1.3,
		isStatic : true
	}

	packageBody = Bodies.circle(width/2 , 200 , 5, package_options);
	World.add(world, packageBody);
	
	var ground_options =
	{
		isStatic:true,
		friction:0.3
	}

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 30, ground_options );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  Engine.update(engine);
  edges = createEdgeSprites();
  background(0);
  holder1.display();
 // console.log(packageBody.position.x);
  packageSprite.x = packageBody.position.x ;
  packageSprite.y = packageBody.position.y ;

  packageBody.position.x = helicopterSprite.x;
  helicopterSprite.collide(edges);

  drawSprites();
}

function keyPressed() {

	if (helicopterState === "Fly" || helicopterState==="Drop") {	
		if (keyCode===DOWN_ARROW) {
			// Look at the hints in the document and understand how to make the package body fall only on
			helicopterState = "Drop";
			helicopterSprite.velocityX = 0;
			Matter.Body.setStatic(packageBody, false);
		}
		else if (keyCode === RIGHT_ARROW) 
		{
			helicopterSprite.velocityX = 7;
		}
		else if (keyCode===LEFT_ARROW) 
		{
			helicopterSprite.velocityX = -7;
		}
	}
}


