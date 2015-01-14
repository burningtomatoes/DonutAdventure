$(document).ready(function() {
    if (!isCanvasSupported()) {
        console.error('Canvas support not detected, refusing to start');
        $('#ohno').show();
        return;
    }

    // Initialize canvas and essential components
    Renderer.start();

    Keyboard.bind();
    Mouse.bind();
    Score.init();

    // Begin preloading sprites and SFX files
    Sprites.preload();
    Sfx.preload();

    // Show the BurningTomato logo
    BurningTomato.show(function() {
        // Once it is ready, display the game intro.
        Map.prepareWorld();
        Letter.show(function() {
            Map.newGame();
        })
    });


    $('canvas').focus();
});

function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}