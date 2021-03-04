const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color( 0x220000 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cubeCentral = new THREE.Mesh( geometry, material );
scene.add( cubeCentral );

cubeCentral.position.x += 0;


camera.position.z = 6;

document.addEventListener('keydown',onDocumentKeyDown);
function onDocumentKeyDown(event)
{
    //var delta = 3.14/180;
    event = event || window.event;
    var keycode = event.keyCode;
    console.log(keycode);
    switch(keycode)
    {
        case 37:
        cubeCentral.rotation.z -= 3.14/180;
        break;
        case 38:
        cubeCentral.rotation.x -= 3.14/180;
        break;
        case 39:
        cubeCentral.rotation.z += 3.14/180;
        break;
        case 40 :
        cubeCentral.rotation.x += 3.14/180;
        console.log(camera.rotation);
        break;
        case 65 : //left arrow 向左箭头
        cubeCentral.rotation.z -= 3.14/180;
        break;
        case 87 : // up arrow 向上箭头
        cubeCentral.rotation.x -= 3.14/180;
        break;
        case 68 : // right arrow 向右箭头
        cubeCentral.rotation.z += 3.14/180;
        break;
        case 83 : //down arrow向下箭头
        cubeCentral.rotation.x += 3.14/180;
        break;
    }
    //document.addEventListener('keyup',onDocumentKeyUp,false);
}


const animate = function () {
    requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();