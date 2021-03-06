
var cubitos = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color( 'hotpink' );
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
var numTimesToSubdivide =2; //>3  requiere  más de 24 GB de RAM, los cuales no tengo D:
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

        var R = 255
        var G = 200;
        var B = 100;
        

       var rainbow = new Rainbow();
       rainbow.setSpectrum('yellow','blue', 'pink');
       rainbow.setNumberRange(0, 27);
        for(var l =0; l <27; l++)
        {   
            var tone = "#"+rainbow.colourAt(l);
            console.log(tone);
            scene.add(cubitos[l]);
            cubitos[l].position.set(puntos[l].x,puntos[l].y,puntos[l].z);
            cubitos[l].material.color.set(new THREE.Color(tone));
            
            
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


function Rainbow()
{
	"use strict";
	var gradients = null;
	var minNum = 0;
	var maxNum = 100;
	var colours = ['ff0000', 'ffff00', '00ff00', '0000ff']; 
	setColours(colours);
	
	function setColours (spectrum) 
	{
		if (spectrum.length < 2) {
			throw new Error('Rainbow must have two or more colours.');
		} else {
			var increment = (maxNum - minNum)/(spectrum.length - 1);
			var firstGradient = new ColourGradient();
			firstGradient.setGradient(spectrum[0], spectrum[1]);
			firstGradient.setNumberRange(minNum, minNum + increment);
			gradients = [ firstGradient ];
			
			for (var i = 1; i < spectrum.length - 1; i++) {
				var colourGradient = new ColourGradient();
				colourGradient.setGradient(spectrum[i], spectrum[i + 1]);
				colourGradient.setNumberRange(minNum + increment * i, minNum + increment * (i + 1)); 
				gradients[i] = colourGradient; 
			}

			colours = spectrum;
		}
	}

	this.setSpectrum = function () 
	{
		setColours(arguments);
		return this;
	}

	this.setSpectrumByArray = function (array)
	{
		setColours(array);
		return this;
	}

	this.colourAt = function (number)
	{
		if (isNaN(number)) {
			throw new TypeError(number + ' is not a number');
		} else if (gradients.length === 1) {
			return gradients[0].colourAt(number);
		} else {
			var segment = (maxNum - minNum)/(gradients.length);
			var index = Math.min(Math.floor((Math.max(number, minNum) - minNum)/segment), gradients.length - 1);
			return gradients[index].colourAt(number);
		}
	}

	this.colorAt = this.colourAt;

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
			setColours(colours);
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
		return this;
	}
}

function ColourGradient() 
{
	"use strict";
	var startColour = 'ff0000';
	var endColour = '0000ff';
	var minNum = 0;
	var maxNum = 100;

	this.setGradient = function (colourStart, colourEnd)
	{
		startColour = getHexColour(colourStart);
		endColour = getHexColour(colourEnd);
	}

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
	}

	this.colourAt = function (number)
	{
		return calcHex(number, startColour.substring(0,2), endColour.substring(0,2)) 
			+ calcHex(number, startColour.substring(2,4), endColour.substring(2,4)) 
			+ calcHex(number, startColour.substring(4,6), endColour.substring(4,6));
	}
	
	function calcHex(number, channelStart_Base16, channelEnd_Base16)
	{
		var num = number;
		if (num < minNum) {
			num = minNum;
		}
		if (num > maxNum) {
			num = maxNum;
		} 
		var numRange = maxNum - minNum;
		var cStart_Base10 = parseInt(channelStart_Base16, 16);
		var cEnd_Base10 = parseInt(channelEnd_Base16, 16); 
		var cPerUnit = (cEnd_Base10 - cStart_Base10)/numRange;
		var c_Base10 = Math.round(cPerUnit * (num - minNum) + cStart_Base10);
		return formatHex(c_Base10.toString(16));
	}

	function formatHex(hex) 
	{
		if (hex.length === 1) {
			return '0' + hex;
		} else {
			return hex;
		}
	} 
	
	function isHexColour(string)
	{
		var regex = /^#?[0-9a-fA-F]{6}$/i;
		return regex.test(string);
	}

	function getHexColour(string)
	{
		if (isHexColour(string)) {
			return string.substring(string.length - 6, string.length);
		} else {
			var name = string.toLowerCase();
			if (colourNames.hasOwnProperty(name)) {
				return colourNames[name];
			}
			throw new Error(string + ' is not a valid colour.');
		}
	}
	
	// Extended list of CSS colornames s taken from
	// http://www.w3.org/TR/css3-color/#svg-color
	var colourNames = {
		aliceblue: "F0F8FF",
		antiquewhite: "FAEBD7",
		aqua: "00FFFF",
		aquamarine: "7FFFD4",
		azure: "F0FFFF",
		beige: "F5F5DC",
		bisque: "FFE4C4",
		black: "000000",
		blanchedalmond: "FFEBCD",
		blue: "0000FF",
		blueviolet: "8A2BE2",
		brown: "A52A2A",
		burlywood: "DEB887",
		cadetblue: "5F9EA0",
		chartreuse: "7FFF00",
		chocolate: "D2691E",
		coral: "FF7F50",
		cornflowerblue: "6495ED",
		cornsilk: "FFF8DC",
		crimson: "DC143C",
		cyan: "00FFFF",
		darkblue: "00008B",
		darkcyan: "008B8B",
		darkgoldenrod: "B8860B",
		darkgray: "A9A9A9",
		darkgreen: "006400",
		darkgrey: "A9A9A9",
		darkkhaki: "BDB76B",
		darkmagenta: "8B008B",
		darkolivegreen: "556B2F",
		darkorange: "FF8C00",
		darkorchid: "9932CC",
		darkred: "8B0000",
		darksalmon: "E9967A",
		darkseagreen: "8FBC8F",
		darkslateblue: "483D8B",
		darkslategray: "2F4F4F",
		darkslategrey: "2F4F4F",
		darkturquoise: "00CED1",
		darkviolet: "9400D3",
		deeppink: "FF1493",
		deepskyblue: "00BFFF",
		dimgray: "696969",
		dimgrey: "696969",
		dodgerblue: "1E90FF",
		firebrick: "B22222",
		floralwhite: "FFFAF0",
		forestgreen: "228B22",
		fuchsia: "FF00FF",
		gainsboro: "DCDCDC",
		ghostwhite: "F8F8FF",
		gold: "FFD700",
		goldenrod: "DAA520",
		gray: "808080",
		green: "008000",
		greenyellow: "ADFF2F",
		grey: "808080",
		honeydew: "F0FFF0",
		hotpink: "FF69B4",
		indianred: "CD5C5C",
		indigo: "4B0082",
		ivory: "FFFFF0",
		khaki: "F0E68C",
		lavender: "E6E6FA",
		lavenderblush: "FFF0F5",
		lawngreen: "7CFC00",
		lemonchiffon: "FFFACD",
		lightblue: "ADD8E6",
		lightcoral: "F08080",
		lightcyan: "E0FFFF",
		lightgoldenrodyellow: "FAFAD2",
		lightgray: "D3D3D3",
		lightgreen: "90EE90",
		lightgrey: "D3D3D3",
		lightpink: "FFB6C1",
		lightsalmon: "FFA07A",
		lightseagreen: "20B2AA",
		lightskyblue: "87CEFA",
		lightslategray: "778899",
		lightslategrey: "778899",
		lightsteelblue: "B0C4DE",
		lightyellow: "FFFFE0",
		lime: "00FF00",
		limegreen: "32CD32",
		linen: "FAF0E6",
		magenta: "FF00FF",
		maroon: "800000",
		mediumaquamarine: "66CDAA",
		mediumblue: "0000CD",
		mediumorchid: "BA55D3",
		mediumpurple: "9370DB",
		mediumseagreen: "3CB371",
		mediumslateblue: "7B68EE",
		mediumspringgreen: "00FA9A",
		mediumturquoise: "48D1CC",
		mediumvioletred: "C71585",
		midnightblue: "191970",
		mintcream: "F5FFFA",
		mistyrose: "FFE4E1",
		moccasin: "FFE4B5",
		navajowhite: "FFDEAD",
		navy: "000080",
		oldlace: "FDF5E6",
		olive: "808000",
		olivedrab: "6B8E23",
		orange: "FFA500",
		orangered: "FF4500",
		orchid: "DA70D6",
		palegoldenrod: "EEE8AA",
		palegreen: "98FB98",
		paleturquoise: "AFEEEE",
		palevioletred: "DB7093",
		papayawhip: "FFEFD5",
		peachpuff: "FFDAB9",
		peru: "CD853F",
		pink: "FFC0CB",
		plum: "DDA0DD",
		powderblue: "B0E0E6",
		purple: "800080",
		red: "FF0000",
		rosybrown: "BC8F8F",
		royalblue: "4169E1",
		saddlebrown: "8B4513",
		salmon: "FA8072",
		sandybrown: "F4A460",
		seagreen: "2E8B57",
		seashell: "FFF5EE",
		sienna: "A0522D",
		silver: "C0C0C0",
		skyblue: "87CEEB",
		slateblue: "6A5ACD",
		slategray: "708090",
		slategrey: "708090",
		snow: "FFFAFA",
		springgreen: "00FF7F",
		steelblue: "4682B4",
		tan: "D2B48C",
		teal: "008080",
		thistle: "D8BFD8",
		tomato: "FF6347",
		turquoise: "40E0D0",
		violet: "EE82EE",
		wheat: "F5DEB3",
		white: "FFFFFF",
		whitesmoke: "F5F5F5",
		yellow: "FFFF00",
		yellowgreen: "9ACD32"
	}
}

if (typeof module !== 'undefined') {
  module.exports = Rainbow;
}