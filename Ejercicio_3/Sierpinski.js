var cubitos = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color( 0x220000 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var grid = new THREE.GridHelper(30, 30, 0xffffff, 0x404040);
scene.add(grid);

const geometry = new THREE.BoxGeometry(1/15,1/15,1/15);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cubeCentral = new THREE.Mesh( geometry, material );
scene.add( cubeCentral );

camera.position.z = 6;

document.addEventListener('keydown',onDocumentKeyDown);

function onDocumentKeyDown(event)
{
    event = event || window.event;
    var keycode = event.keyCode;
    switch(keycode)
    {
        case 16: //Shift
            camera.translateY(0.25);
            camera.lookAt(cubeCentral.position);
        break;
        case 17: // Control
            camera.translateY(-0.25);
            camera.lookAt(cubeCentral.position);           
        break;
        case 40: //Abajo flecha
            camera.translateZ(1);
            camera.lookAt(cubeCentral.position);
        break;
        case 37: //Derecha felcha
            camera.translateX(-1);
            camera.translateZ(-0.11);
            camera.lookAt(cubeCentral.position);
        break;
        case 38: //Arriba felcha
            camera.translateZ(-1);
            camera.lookAt(cubeCentral.position);
        break;
        case 39: //Izquierda flecha
            camera.translateX(1);
            camera.translateZ(-0.11);
            camera.lookAt(cubeCentral.position);
        break;
        //POR COPIPASTEAR
        case 65 : //A key
            camera.rotation.z -= 3.14/180;
        break;
        case 87 : // W key 
            camera.translateY(0.245);
            camera.lookAt(cubeCentral.position);
        break;
        case 68 : // D Key 
            camera.rotation.z += 3.14/180;
        break;
        case 83 : // S key
            camera.translateY(-0.245);
            camera.lookAt(cubeCentral.position); 
        break;
    }
}
var numTimesToSubdivide = 3; //>3  requiere  más de 24 GB de RAM, los cuales no tengo D:
var expectedCubes = Math.pow(20,numTimesToSubdivide);
var iteracion = 1;

function divideCube(count,originPoint)
{
    var puntos = [];
    var relDelta= 1/Math.pow(3,iteracion-1)
                -(1/Math.pow(3,iteracion));
    for (var h =0; h <27;h++)
    {
        puntos.push(new THREE.Vector3(0,0,0));
    }
    puntos[0]  = new THREE.Vector3 (relDelta+originPoint.x,0+originPoint.y,0+originPoint.z);
    puntos[1]  = new THREE.Vector3 (0+originPoint.x,0+originPoint.y,0+originPoint.z);
    puntos[2]  = new THREE.Vector3 (-relDelta+originPoint.x,0+originPoint.y,0+originPoint.z);
    puntos[3]  = new THREE.Vector3 (relDelta+originPoint.x,relDelta+originPoint.y,0+originPoint.z);
    puntos[4]  = new THREE.Vector3 (0+originPoint.x,relDelta+originPoint.y,0+originPoint.z);
    puntos[5]  = new THREE.Vector3 (-relDelta+originPoint.x,relDelta+originPoint.y,0+originPoint.z);
    puntos[6]  = new THREE.Vector3 (relDelta+originPoint.x,-relDelta+originPoint.y,0+originPoint.z);
    puntos[7]  = new THREE.Vector3 (0+originPoint.x,-relDelta+originPoint.y,0+originPoint.z);
    puntos[8]  = new THREE.Vector3 (-relDelta+originPoint.x,-relDelta+originPoint.y,0+originPoint.z);
    puntos[9]  = new THREE.Vector3 (relDelta+originPoint.x,0+originPoint.y,-relDelta+originPoint.z);
    puntos[10]  = new THREE.Vector3 (0+originPoint.x,0+originPoint.y,-relDelta+originPoint.y);
    puntos[11]  = new THREE.Vector3 (-relDelta+originPoint.x,0+originPoint.y,-relDelta+originPoint.z);
    puntos[12]  = new THREE.Vector3 (relDelta+originPoint.x,relDelta+originPoint.y,-relDelta+originPoint.z);
    puntos[13]  = new THREE.Vector3 (0+originPoint.x,relDelta+originPoint.y,-relDelta+originPoint.z);
    puntos[14]  = new THREE.Vector3 (-relDelta+originPoint.x,relDelta+originPoint.y,-relDelta+originPoint.z);
    puntos[15]  = new THREE.Vector3 (relDelta+originPoint.x,-relDelta+originPoint.y,-relDelta+originPoint.z);
    puntos[16]  = new THREE.Vector3 (0+originPoint.x,-relDelta+originPoint.y,-relDelta+originPoint.z);
    puntos[17]  = new THREE.Vector3 (-relDelta+originPoint.x,-relDelta+originPoint.y,-relDelta+originPoint.z);
    puntos[18]  = new THREE.Vector3 (relDelta+originPoint.x,0+originPoint.y,relDelta+originPoint.z);
    puntos[19]  = new THREE.Vector3 (0+originPoint.x,0+originPoint.y,relDelta+originPoint.z);
    puntos[20]  = new THREE.Vector3 (-relDelta+originPoint.x,0+originPoint.y,relDelta+originPoint.z);
    puntos[21]  = new THREE.Vector3 (relDelta+originPoint.x,relDelta+originPoint.y,relDelta+originPoint.z);
    puntos[22]  = new THREE.Vector3 (0+originPoint.x,relDelta+originPoint.y,relDelta+originPoint.z);
    puntos[23]  = new THREE.Vector3 (-relDelta+originPoint.x,relDelta+originPoint.y,relDelta+originPoint.z);
    puntos[24]  = new THREE.Vector3 (relDelta+originPoint.x,-relDelta+originPoint.y,relDelta+originPoint.z);
    puntos[25]  = new THREE.Vector3 (0+originPoint.x,-relDelta+originPoint.y,relDelta+originPoint.z);
    puntos[26]  = new THREE.Vector3 (-relDelta+originPoint.x,-relDelta+originPoint.y,relDelta+originPoint.z); 
    if (count == 0) 
    {
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 9; j++)
            {
                var geo = new THREE.BoxGeometry(
                    2/Math.pow(3,numTimesToSubdivide),
                    2/Math.pow(3,numTimesToSubdivide),
                    2/Math.pow(3,numTimesToSubdivide));
                cubitos.push(new THREE.Mesh(geo,new THREE.MeshBasicMaterial()));
            }
        }
        for(var l =0; l <27; l++)
        {
            scene.add(cubitos[l]);
            cubitos[l].position.set(puntos[l].x,puntos[l].y,puntos[l].z);
            cubitos[l].material.color.set(new THREE.Color(Math.random(),Math.random(),Math.random()))
        }
        scene.remove(cubitos[0]);
        scene.remove(cubitos[1]);
        scene.remove(cubitos[2]);
        scene.remove(cubitos[4]);
        scene.remove(cubitos[7]);
        scene.remove(cubitos[10]);
        scene.remove(cubitos[19]); 
        cubitos=[];      
    }
    else 
    {
        --count;
        iteracion++;
        divideCube(count,puntos[3]);
        divideCube(count,puntos[5]);
        divideCube(count,puntos[6]);
        divideCube(count,puntos[8]);
        divideCube(count,puntos[9]);
        divideCube(count,puntos[11]);
        divideCube(count,puntos[12]);
        divideCube(count,puntos[13]);
        divideCube(count,puntos[14]);
        divideCube(count,puntos[15]);
        divideCube(count,puntos[16]);
        divideCube(count,puntos[17]);
        divideCube(count,puntos[18]);
        divideCube(count,puntos[20]);
        divideCube(count,puntos[21]);
        divideCube(count,puntos[22]);
        divideCube(count,puntos[23]);
        divideCube(count,puntos[24]);
        divideCube(count,puntos[25]);
        divideCube(count,puntos[26]);
        iteracion--; 
    }
}
if(numTimesToSubdivide>=1)
{
    divideCube(numTimesToSubdivide-1,new THREE.Vector3(0,0,0));
}
else
{
    const geometry_1 = new THREE.BoxGeometry(2,2,2);
    const material_1 = new THREE.MeshBasicMaterial( { color: 0x0cff02 } );
    scene.add(new THREE.Mesh( geometry_1, material_1 ));
}


const animate = function () 
{
    requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();