const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

const drawBody = Helpers.drawBody;
const drawMouse = Helpers.drawMouse;

let engine;

let wallLeft;
let wallRight;
let ground;

let T1L = {
  colorR: 255,
  colorG: 0,
  colorB: 0,
  x1: 100,
  y1: 100,
  x2: 300,
  y2: 100,
  x3: 200,
  y3: 200,
  angle: 45,
  speed: 4
}

let T1R= {
  colorR: 255,
  colorG: 255,
  colorB: 0,
  x1: 300,
  y1: 100,
  x2: 500,
  y2: 100,
  x3: 400,
  y3: 200,
  angle: 180,
  speed: 2.5
}

let T2L= {
  angle: 90,
  colorR: 0,
  colorG: 255,
  colorB: 0,
  x1: 300,
  y1: 100,
  x2: 500,
  y2: 100,
  x3: 400,
  y3: 200,
  speed: 5
}

let T2R = {
  angle: 0,
  colorR: 0,
  colorG: 0,
  colorB: 255,
  x1: 300,
  y1: 500,
  x2: 500,
  y2: 500,
  x3: 400,
  y3: 300,
  speed: 1
}
let colorChange= 1
let T2L_color= (T2L.colorR, T2L.colorG,T2L.colorB)
let rotateObjectsArray= [T1L,T2L];
let speedObjectsArray02 = [T1R,T2R];
let tcolorArray= [T1L.colorR,T1L.colorG,T1L.colorB]

let triangleArray = [T1L, T2L, T1R, T2R]
let triangleArrayBodies = [];


function setup() {
  const canvas = createCanvas(800, 800);

  // create an engine
  engine = Engine.create();


  // Adds triangles into our World
  // First, we go through each item in the array
  // Then we add each item into the world

  for (i = 0; i < triangleArray.length; i++) {
    triangleArrayBodies[i] = Bodies.fromVertices(200, 0, [
      {x: triangleArray[i].x1, y: triangleArray[i].y1},
      {x: triangleArray[i].x2, y: triangleArray[i].y2},
      {x: triangleArray[i].x3, y: triangleArray[i].y3},
    ]);

    Body.rotate(triangleArrayBodies[i], triangleArray[i].angle);
    World.add(engine.world, [triangleArrayBodies[i]]);
  }

  // create two boxes and a ground
  ground = Bodies.rectangle(400,800, 810, 25, {
    isStatic: true, angle: Math.PI * 0.00
  });

  wallLeft = Bodies.rectangle(-50, 1000, 100, 5000, {
    isStatic: true, angle: Math.PI * 0.00}
  );

  wallRight = Bodies.rectangle(800, 1000, 100, 5000, {
    isStatic: true, angle: Math.PI * 0.00}
  );

  World.add(engine.world, [ground, wallLeft, wallRight]);

  // setup mouse
  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05, angularStiffness: 0 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);


if (triangleArrayBodies[i]>700 || (triangleArray.colorR,triangleArray.colorG,triangleArray.colorB)<colorChange){colorChange = -colorChange}



  // run the engine
  Engine.run(engine);
}

function draw() {
  background(0);


  if (T2L_color > 255 || T2L_color < 0) {
    colorChange = -colorChange;
  }
  T2L_color = T2L_color + colorChange;
  console.log(T2L_color)


  noStroke();

  for (i = 0; i < triangleArray.length; i++) {
    fill(triangleArray[i].colorR, triangleArray[i].colorG, triangleArray[i].colorB);
    drawBody(triangleArrayBodies[i]);
  };

  

  fill(0);
  drawBody(ground);
  drawBody(wallLeft);
  drawBody(wallRight);

  drawMouse(mouseConstraint);

}
