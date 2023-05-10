/**
 * Tempat untuk nge-merge bareng.
 */
function renderWebGL() {

    gl.clear( gl.COLOR_BUFFER_BIT );
    
    traverse(torsoId);
    
    requestAnimationFrame(renderWebGL);
}