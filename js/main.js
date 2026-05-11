const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Boot, Carga, Inicio, Juego]
};

window.onload = function(){ // Funciona como un evento 
    new Phaser.Game(config); //Cuando la pagina termine de cagar completamente inicia el juego, aranca phaser y carga el sistema de escenas
}
