/**
 * Tempat kita nge-merge bareng.
 */
function main(){

    //Gw harap ini gak berubah
    initializeWebGL();

    //4 function ini gw rasa bisa dipecah-pecah sesuai dengan tugas kita
    initializeEventListener();
    initializeUniforms();
    initializeAttributes();
    initializeObject();

    //Ini juga jadi tempat kita nge-merge.
    renderWebGL();
}

main();

