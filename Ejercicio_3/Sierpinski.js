var cubitos = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color( 0x220000 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
//scene.add( light );

var grid = new THREE.GridHelper(30, 30, 0xffffff, 0x404040);
grid.rotation.x = Math.PI * 0.5;
scene.add(grid);

const geometry = new THREE.BoxGeometry(1/10,1/10,1/10);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cubeCentral = new THREE.Mesh( geometry, material );
scene.add( cubeCentral );

cubeCentral.position.x += 0;


camera.position.z = 6;

document.addEventListener('keydown',onDocumentKeyDown);

function RNG(min, max)
{
    return Math.floor(Math.random() * (max - min) ) + min;
}


function onDocumentKeyDown(event)
{
    //var delta = 3.14/180;
    event = event || window.event;
    var keycode = event.keyCode;
    //console.log(keycode);
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
        case 38: //Abajo flecha
            camera.translateZ(1);
            camera.lookAt(cubeCentral.position);
        break;
        case 39: //Derecha felcha
            camera.translateX(-1);
            camera.translateZ(-0.2);
            camera.lookAt(cubeCentral.position);
        break;
        case 40: //Arriba felcha
            camera.translateZ(-1);
            camera.lookAt(cubeCentral.position);
        break;
        case 37: //Izquierda flecha
            camera.translateX(1);
            camera.translateZ(-0.2);
            camera.lookAt(cubeCentral.position);
        break;
        //POR COPIPASTEAR
        case 65 : //left arrow 向左箭头
            camera.rotation.z -= 3.14/180;
        break;
        case 87 : // up arrow 向上箭头
            camera.rotation.x += 3.14/180;
        break;
        case 68 : // right arrow 向右箭头
            camera.rotation.z += 3.14/180;
        break;
        case 83 : //down arrow向下箭头
            camera.rotation.x -= 3.14/180;
        break;
    }
}
var a,b,c,d = 0;
var numTimesToSubdivide = 1;

function divideCube(count)
{
    if (count == 0) 
    {
        //Hardcodear la iteracion 1, las demas no
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 9; j++)
            {
                var geo = new THREE.BoxGeometry(
                    2/Math.pow(3,numTimesToSubdivide),
                    2/Math.pow(3,numTimesToSubdivide),
                    2/Math.pow(3,numTimesToSubdivide));
                //var mat = new THREE.MeshBasicMaterial();
                cubitos.push(new THREE.Mesh(geo,new THREE.MeshBasicMaterial()));
            }
        }
        for(var l =0; l <27; l++)
        {
            scene.add(cubitos[l]);
            cubitos[l].material.color.set(new THREE.Color(Math.random(),Math.random(),Math.random()))
        }

        console.log(cubitos[0].geometry.width);
        var deltaTemp = 1-(1/3); 
        cubitos[0].position.set(deltaTemp,0,0);
        cubitos[1].position.set(0,0,0);
        cubitos[2].position.set(-deltaTemp,0,0);
        cubitos[3].position.set(deltaTemp,deltaTemp,0);
        cubitos[4].position.set(0,deltaTemp,0);
        cubitos[5].position.set(-deltaTemp,deltaTemp,0);
        cubitos[6].position.set(deltaTemp,-deltaTemp,0);
        cubitos[7].position.set(0,-deltaTemp,0);
        cubitos[8].position.set(-deltaTemp,-deltaTemp,0);
        scene.remove(cubitos[1]);
        scene.remove(cubitos[0]);
        scene.remove(cubitos[2]);
        scene.remove(cubitos[4]);
        scene.remove(cubitos[7]);
        ////
        cubitos[9].position.set(deltaTemp,0,-deltaTemp);
        cubitos[10].position.set(0,0,-deltaTemp);
        cubitos[11].position.set(-deltaTemp,0,-deltaTemp);
        cubitos[12].position.set(deltaTemp,deltaTemp,-deltaTemp);
        cubitos[13].position.set(0,deltaTemp,-deltaTemp);
        cubitos[14].position.set(-deltaTemp,deltaTemp,-deltaTemp);
        cubitos[15].position.set(deltaTemp,-deltaTemp,-deltaTemp);
        cubitos[16].position.set(0,-deltaTemp,-deltaTemp);
        cubitos[17].position.set(-deltaTemp,-deltaTemp,-deltaTemp);
        scene.remove(cubitos[10]);
        ////
        cubitos[18].position.set(deltaTemp,0,deltaTemp);
        cubitos[19].position.set(0,0,deltaTemp);
        cubitos[20].position.set(-deltaTemp,0,deltaTemp);
        cubitos[21].position.set(deltaTemp,deltaTemp,deltaTemp);
        cubitos[22].position.set(0,deltaTemp,deltaTemp);
        cubitos[23].position.set(-deltaTemp,deltaTemp,deltaTemp);
        cubitos[24].position.set(deltaTemp,-deltaTemp,deltaTemp);
        cubitos[25].position.set(0,-deltaTemp,deltaTemp);
        cubitos[26].position.set(-deltaTemp,-deltaTemp,deltaTemp); 
        scene.remove(cubitos[19]);       
    }
    else 
    {
        //console.log(points);
        --count;
        //console.log(aac,cy,c,ccd);
        //debugger;
        //Hacerlo en otro orden se ve mal
        // divideSquare(count,a,aab,aac,aw);
        // divideSquare(count,aab,abb,aw,bx);
        // divideSquare(count,abb,b,bx,bbd);
        // divideSquare(count,bx,bbd,dz,bdd);
        // divideSquare(count,aac,aw,acc,cy);
        // divideSquare(count,acc,cy,c,ccd);
        // divideSquare(count,cy,dz,ccd,cdd);
        // divideSquare(count,dz,bdd,cdd,d);
    }
}
if(numTimesToSubdivide>=1)
{
    divideCube(numTimesToSubdivide-1);
}
else
{
    const geometry_1 = new THREE.BoxGeometry(2,2,2);
    const material_1 = new THREE.MeshBasicMaterial( { color: 0x0cff02 } );
    scene.add(new THREE.Mesh( geometry_1, material_1 ));
}


const animate = function () {
    requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();