import * as THREE from "three"; 

const w = window.innerWidth;
const h = window.innerHeight; 

const renderer = new THREE.WebGLRenderer( { antialias : true });

renderer.setSize(w,h);

document.body.appendChild(renderer.domElement); 
const fov = 75 ; 
const aspect = w/h ; 
const near = 0.1 ; 
const far = 100 ; 

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

camera.position.z = 15; 
const scene = new THREE.Scene(); 

const geometry = new THREE.PlaneGeometry(0.07, 0.07); 
const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); 
function AddDot( vertex )
{
     
    const flatDot = new THREE.Mesh(geometry, material);
    flatDot.position.copy(vertex)
    scene.add(flatDot);
}



var vertexA ;
var vertexB ; 
var vertexC ; 
var randomVertex;

function GenerateInitialPoints(scale)
{
  vertexA = new THREE.Vector3(-scale,-scale,0);
  vertexB = new THREE.Vector3(2*scale - scale,-scale,0);
  vertexC = new THREE.Vector3(-scale,Math.sqrt(3)*scale - scale,0);
  
 randomVertex = ChooseRandomVertexInTriangle();
  AddDot(vertexA);
  AddDot(vertexB); 
  AddDot(vertexC);
  AddDot(randomVertex);

}
function ChooseRandomVertexInTriangle()
{
    let randomValue = Math.floor(Math.random()*3);
 
    if(randomValue == 2) { return vertexA}
    else if(randomValue == 1){ return vertexB}
    else{return vertexC }
    
    
  
}
GenerateInitialPoints(7);
function SierpinskiIteration(   startPoint , noOfIterations) 
{
  
  if( noOfIterations  > 0 )
  {
    noOfIterations--;
    let vertexOfTriangle = ChooseRandomVertexInTriangle() ; 
    
    let midpoint =  new THREE.Vector3
    ((startPoint.x + vertexOfTriangle.x) /2,
    (startPoint.y + vertexOfTriangle.y) /2,
    0
    )

  
   AddDot( midpoint); 
   renderer.render(scene,camera);
  SierpinskiIteration( midpoint, noOfIterations ) ;

  }

}



function animation(t=0)
{
    requestAnimationFrame(animation);
   setInterval(() => SierpinskiIteration(randomVertex,10), .05); 
X
   
    renderer.render(scene,camera);
}


animation();
