$(document).ready(function() {
    if (!isCanvasSupported()) {
        console.error('Canvas support not detected, refusing to start');
        $('#ohno').show();
        return;
    }

    Renderer.start();

    Keyboard.bind();
    Mouse.bind();
    Score.init();

    Sprites.preload();
    Sfx.preload();

    Map.newGame();

    $('canvas').focus();
});

function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}