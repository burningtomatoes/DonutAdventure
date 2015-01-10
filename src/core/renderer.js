/**
 * The main game class, which is responsible for managing the update/draw loop.
 * Other components are responsible for actually putting things on the screen.
 */
var Renderer = {
    $canvas: null,
    canvas: null,
    context: null,

    lastRenderTime: null,
    fps: 0,

    /**
     * Binds to the canvas element on the page, configures it and begins the update/render loop.
     * NB: This function should normally only be called once (when the game is starting).
     */
    start: function() {
        console.info('[Renderer] Game is starting, starting loop.');

        // Find the Canvas element we will be drawing to and retrieve the drawing context
        Renderer.$canvas = $('#game');
        Renderer.canvas = Renderer.$canvas[0];
        Renderer.context = Renderer.canvas.getContext('2d');

        console.info('[Renderer] Canvas resolution is ' + Renderer.canvas.width + 'x' + Renderer.canvas.height + '.');

        // Try to disable the "smooth" (stretched becomes blurry) scaling on the Canvas element
        // Instead, we want a "pixelated" effect (nearest neighbor scaling)
        Renderer.canvas.mozImageSmoothingEnabled = false;
        Renderer.canvas.webkitImageSmoothingEnabled = false;
        Renderer.canvas.msImageSmoothingEnabled = false;
        Renderer.canvas.imageSmoothingEnabled = false;

        // Begin the loop
        var loop = function() {
            window.requestAnimationFrame(loop);

            Renderer.update();
            Renderer.draw();

            if (this.lastRenderTime == null) {
                this.lastRenderTime = Date.now();
                this.fps = 0;
            } else {
                var delta = (new Date().getTime() - this.lastRenderTime) / 1000;
                this.lastRenderTime = Date.now();
                this.fps = 1/delta;
            }
        }.bind(this);

        loop();

        var updateFps = function() {
            var $fps = $('#fps');
            $fps.text(this.fps.toFixed(0));
            $fps.removeClass().addClass(this.fps >= 30 ? 'ok' : 'slow');
        }.bind(this);

        window.setInterval(updateFps, 1000);
    },

    /**
     * Updates all entities on the screen.
     * This function is responsible for performing all calculations, before the frame is drawn.
     */
    update: function() {
        Camera.update();
        Keyboard.update();
        Map.update();
    },

    /**
     * Renders one frame to the render context.
     * This function is responsible for drawing everything, based on the states set in the update function.
     */
    draw: function() {
        Map.draw(this.context);
    }
};