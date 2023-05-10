"use strict";

var canvas;
var gl;
var program;

function initializeCanvas(){
    canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }
}

function initializeCanvasColor(){
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
}

function loadShaders(){
    program = initShaders( gl, "vertex-shader", "fragment-shader");
    gl.useProgram( program);
}

function initializeWebGL() {
    initializeCanvas();
    initializeCanvasColor();
    loadShaders();
}
