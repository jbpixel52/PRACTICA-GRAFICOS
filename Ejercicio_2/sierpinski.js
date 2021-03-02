var canvas;
var gl;

var points = [];

var numTimesToSubdivide = 0;

//////Cuadrado de referencia
//  A----------B
//  |          |
//  |          |
//  |          |
//  |          |
//  C----------D


function divideSquare(count, a, b, c, d) 
{
    //(d[1]-b[1])debugger;
    //Definir puntos
    //Top line
    var delta = b[0]-a[0];
    delta = delta *0.33333333333333333333333333333333333333333333;
    //console.log(delta);
    var a = a;
    var aab = vec2((a[0]+delta),a[1]);
    var abb = vec2((a[0]+delta*2),a[1]);
    var b = b;
    //2nd line
    var aac = vec2(a[0],(b[1])-delta);
    var aw = vec2(aab[0],aac[1]);
    var bx = vec2(abb[0],aac[1]);
    var bbd = vec2(b[0], aac[1]);
    //3rd line
    var acc = vec2(a[0],(b[1])-delta*2);
    var cy = vec2(aab[0],acc[1]);
    var dz = vec2(abb[0],acc[1]);
    var bdd = vec2(b[0],acc[1]);
    //4th line
    var c = c;
    var ccd = vec2(abb[0],c[1]);
    var cdd = vec2(abb[0],c[1]);
    var d = d;
    
    if (count == 0) 
    {
        
        //Puntos listos
        //Upper block
        points.push(a);
        points.push(aac);
        points.push(bbd);
        points.push(a);
        points.push(b);
        points.push(bbd);
        //Rightlowerblock
        points.push(bbd);
        points.push(d);
        points.push(bx);
        points.push(bx);
        points.push(cdd);
        points.push(d);
        //Lowerleft block
        points.push(acc);
        points.push(dz);
        points.push(cdd);
        points.push(acc);
        points.push(c);
        points.push(cdd);
        //Left block
        points.push(aac);
        points.push(acc); 
        points.push(cy);
        points.push(cy);
        points.push(aw);
        points.push(aac);
    }
    else 
    {
        //console.log(points);
        --count;
        //console.log(aac,cy,c,ccd);
        //debugger;
        //Hacerlo en otro orden se ve mal
        divideSquare(count,a,aab,aac,aw);
        divideSquare(count,aab,abb,aw,bx);
        divideSquare(count,abb,b,bx,bbd);
        divideSquare(count,bx,bbd,dz,bdd);
        divideSquare(count,aac,aw,acc,cy);
        divideSquare(count,acc,cy,c,ccd);
        divideSquare(count,cy,dz,ccd,cdd);
        divideSquare(count,dz,bdd,cdd,d);
    }
}


function init() {
    document.getElementById("myslider").onchange = function () {
        numTimesToSubdivide = parseInt(event.target.value);
        //console.log(numTimesToSubdivide);
    };
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //Main square de prueba
    var a = vec2(-1, 1);
    var c = vec2(-1, -1); 
    var d = vec2(1, -1);
    var b = vec2(1 , 1);
    if(numTimesToSubdivide>=1)
    {
        divideSquare(numTimesToSubdivide-1, a,b,c,d,program);
    }
    else
    {
        //Triangulo izq de prueba
        points.push(a)
        points.push(c)
        points.push(d)
        //Triangulo der de prueba
        points.push(a);
        points.push(b);
        points.push(d);
    }


    

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * Math.pow(3, 11), gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();
    
    
};

window.onload = init;

function render() 
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);
    //Probemos ambos, uno debera servir a lo minimo
    //gl.drawArrays(gl.TRIANGLES, 0, points.length);
    gl.flush();
    requestAnimationFrame(init);
    //console.log(points.length);
    points=[];
}
