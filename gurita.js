"use strict";

var canvas, gl, program;

var NumVertices = 36; //(6 faces)(2 triangles/face)(3 vertices/triangle)

var points = [];
var colors = [];

var animate = false;

var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5, -0.5, -0.5, 1.0 )
];

// RGBA colors
var vertexColors = [
    vec4(0, 0, 0, 1.0),   // black
    vec4(77/255, 208/255, 225/255, 1),  // blue
    vec4(178/255, 235/255, 242/255, 1),  // yellow
    vec4(128/255, 222/255, 234/255, 1),  // green
    vec4(38/255, 198/255, 218/255, 1),  // red
    vec4(0/255, 188/255, 212/255, 1),  // purple
    vec4(0/255, 172/255, 193/255, 1),  // orange
    vec4(0/255, 151/255, 167/255, 1),   // brown
];


// Parameters controlling the size of the Robot's arm

var BASE_HEIGHT      = 6.0;
var BASE_WIDTH       = 5.0;
var UPPER_ARM_HEIGHT = 5.0;
var UPPER_ARM_WIDTH  = 0.5;
var LOWER_ARM_HEIGHT = 4.5;
var LOWER_ARM_WIDTH  = 0.5;

// Shader transformation matrices

var modelViewMatrix, projectionMatrix;

// Array of rotation angles (in degrees) for each rotation axis

var Base = 0;
var UpperArm = 1;
var LowerArm = 2;

var theta = [
    [ 0, 120, 60],
    [ 0, 120, 60],
    [ 0, 120, 60],
    [ 0, 120, 60],
    [ 0, 120, 60],
    [ 0, 120, 60],
    [ 0, 120, 60],
    [ 0, 120, 60],
    [ 0, 120, 60],
];

var minTUpper = 120;
var minTLower = 0;
var iUpper = 1;
var iLower = -1;

var angle = 0;

var modelViewMatrixLoc;

var vBuffer, cBuffer;

init();

//----------------------------------------------------------------------------

function quad(  a,  b,  c,  d ) {
    colors.push(vertexColors[a]);
    points.push(vertices[a]);
    colors.push(vertexColors[a]);
    points.push(vertices[b]);
    colors.push(vertexColors[a]);
    points.push(vertices[c]);
    colors.push(vertexColors[a]);
    points.push(vertices[a]);
    colors.push(vertexColors[a]);
    points.push(vertices[c]);
    colors.push(vertexColors[a]);
    points.push(vertices[d]);
}


function colorCube() {
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}


//--------------------------------------------------

function autoChangeAnimate() {
    animate = false; 
    document.getElementById("reset").disabled = false;
    document.getElementById("animate").disabled = true;
}

function keyEvent() {

    document.getElementById("slider0").oninput = function(event) {
        for (let i = 0; i < theta.length; i++) {
            theta[i][0] = event.target.value;
        }
        autoChangeAnimate();
    };
    document.getElementById("sliderArmL").oninput = function(event) {
        for (let i = 0; i < theta.length; i++) {
            theta[i][1] = event.target.value;
        }
        autoChangeAnimate();
    };
    document.getElementById("sliderArmU").oninput = function(event) {
        for (let i = 0; i < theta.length; i++) {
            theta[i][2] = event.target.value;
        }
        autoChangeAnimate();
    };
    document.getElementById("slider1a").oninput = function(event) {
         theta[1][1] = event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider1b").oninput = function(event) {
         theta[1][2] =  event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider2a").oninput = function(event) {
         theta[2][1] = event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider2b").oninput = function(event) {
         theta[2][2] =  event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider3a").oninput = function(event) {
         theta[3][1] = event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider3b").oninput = function(event) {
         theta[3][2] =  event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider4a").oninput = function(event) {
         theta[4][1] = event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider4b").oninput = function(event) {
         theta[4][2] =  event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider5a").oninput = function(event) {
         theta[5][1] = event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider5b").oninput = function(event) {
         theta[5][2] =  event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider6a").oninput = function(event) {
         theta[6][1] = event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider6b").oninput = function(event) {
         theta[6][2] =  event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider7a").oninput = function(event) {
         theta[7][1] = event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider7b").oninput = function(event) {
         theta[7][2] =  event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider8a").oninput = function(event) {
         theta[8][1] = event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("slider8b").oninput = function(event) {
         theta[8][2] =  event.target.value;
         autoChangeAnimate();
        };
    document.getElementById("animate").onclick = function() {
        animate = !animate;
        if (!animate) {
            document.getElementById("animate").innerHTML = "Animation: Off";
        } else {
            document.getElementById("animate").innerHTML = "Animation: On";
        }
    };
    document.getElementById("reset").onclick = function() {
        for (let i = 0; i < theta.length; i++) {
            theta[i] = [0,120,60];
        }
        document.getElementById("animate").disabled = false;
    };

}


//--------------------------------------------------

function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 224/255, 247/255, 250/255, 1.0 );
    gl.enable( gl.DEPTH_TEST );

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );

    gl.useProgram( program );

    colorCube();

    // Load shaders and use the resulting shader program

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create and initialize  buffer objects

    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLoc );

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var colorLoc = gl.getAttribLocation( program, "aColor" );
    gl.vertexAttribPointer( colorLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( colorLoc );

    keyEvent();

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

    projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),  false, flatten(projectionMatrix) );

    render();
}

//----------------------------------------------------------------------------


function base() {
    var s = scale(BASE_WIDTH, BASE_HEIGHT, BASE_WIDTH);
    var instanceMatrix = mult( translate( 0.0, 0.5*BASE_HEIGHT, 0.0 ), s);

    var t = mult(modelViewMatrix, instanceMatrix);
    
    gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t)  );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

//----------------------------------------------------------------------------


function lowerArm(x, y) {
    var s = scale(y*LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, x*LOWER_ARM_WIDTH);

    var instanceMatrix = mult(translate( 0.0, 0.5 * LOWER_ARM_HEIGHT, 0.0 ),s);

    var t = mult(modelViewMatrix, instanceMatrix);

    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t)  );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

//----------------------------------------------------------------------------


function upperArm(x, y)
{
    var s = scale(y*UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, x*UPPER_ARM_WIDTH);
    var instanceMatrix = mult( translate( 0.0, 0.5 * UPPER_ARM_HEIGHT, 0.0 ), s);


    var t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t)   );
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

}

//----------------------------------------------------------------------------

function oneArm(a,b,c,theta,x,y) {
    modelViewMatrix = rotate(theta[Base], vec3(0, 1, 0 ));
    
    modelViewMatrix = mult(modelViewMatrix, translate(0.0, 0.25*BASE_HEIGHT, 0.0));
    modelViewMatrix = mult(modelViewMatrix, rotate(theta[UpperArm], vec3(a, b, c)));
    upperArm(x,y);

    modelViewMatrix  = mult(modelViewMatrix, translate(0.0, UPPER_ARM_HEIGHT, 0.0));
    modelViewMatrix  = mult(modelViewMatrix, rotate(theta[LowerArm], vec3(a, b, c)) );

    lowerArm(x,y);
}

function renderArm(a, b, c, theta1, theta2, x) {
    oneArm(a,b,c,theta1,x,-x);
    oneArm(-a,-b,-c,theta2,x,-x);
}

//----------------------------------------------------------------------------

function render() {

    if(animate) {
        for (let i = 0; i < theta.length; i++) {
            theta[i][0] += 1;
            theta[i][1] += iUpper;
            theta[i][2] += iLower;

        }
        if (theta[0][1] < minTUpper || theta[0][1] > 180) {
            iUpper *= -1;
        }
        if (theta[0][2] < minTLower || theta[0][2] > 60) {
            iLower *= -1;
        }
    }

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    modelViewMatrix = rotate(theta[0][Base], vec3(0, 1, 0 ));
    base();

    // pasangan tentacle pertama
    renderArm(0,0,1,theta[1],theta[2], 1);

    // pasangan tentacle kedua
    renderArm(1,0,0,theta[3],theta[4], -1);

    // pasangan tentacle ketiga
    renderArm(1,0,1,theta[5],theta[6], 1);

    // pasangan tentacle keempat
    renderArm(-1,0,1,theta[7],theta[8], -1);
    // sehingga total tentacle ada 8

    requestAnimationFrame(render);
}
