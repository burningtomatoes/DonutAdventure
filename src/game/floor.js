var Floor = Class.extend({
    spriteFloor: null,
    spriteWallsSide: null,
    spriteWallsSideWidth: 24,

    y: 0,

    init: function() {
        this.spriteFloor = Sprites.load('floor');
        this.spriteWallsSide = Sprites.load('brickwall_side');
    },

    update: function() {
        this.y += Map.velocity;

        if (this.y >= Renderer.canvas.height) {
            this.y = 0;
        }
    },

    generatePatterns: function() {
        // Constantly generating & drawing patterns is drawing out some huge performance issues.
        // In order to avoid this problem, we'll pre-render the floor and wall patterns as images and render those.
        // This function should only be called once - when the floor is created (which is when a new game [re]starts).

        /*** 1 - The supermarket floor ***/
        {
            var canvas = document.createElement('canvas');
            canvas.width = Renderer.canvas.width;
            canvas.height = Renderer.canvas.height;
            var ctx = canvas.getContext('2d');

            var floorPattern = ctx.createPattern(this.spriteFloor, "repeat");

            ctx.rect(0, 0, Renderer.canvas.width, Renderer.canvas.height);
            ctx.fillStyle = floorPattern;
            ctx.fill();

            this.floorImage = canvas;
        }

        /*** 2 - The walls on the side ***/
        {
            var canvas = document.createElement('canvas');
            canvas.width = this.spriteWallsSideWidth;
            canvas.height = Renderer.canvas.height;
            var ctx = canvas.getContext('2d');

            var wallPattern = ctx.createPattern(this.spriteWallsSide, "repeat");

            ctx.rect(0, 0, this.spriteWallsSideWidth, Renderer.canvas.height);
            ctx.fillStyle = wallPattern;
            ctx.fill();

            this.wallsImage = canvas;
        }

    },

    patternsReady: false,
    floorImage: null,
    wallsImage: null,

    draw: function(ctx) {
        if (!this.patternsReady) {
            this.generatePatterns();
        }

        ctx.translate(0, this.y);

        // Floor
        ctx.drawImage(this.floorImage, 0, 0, Renderer.canvas.width, Renderer.canvas.height, 0, -Renderer.canvas.height,
            Renderer.canvas.width, Renderer.canvas.height);
        ctx.drawImage(this.floorImage, 0, 0, Renderer.canvas.width, Renderer.canvas.height, 0, 0, Renderer.canvas.width,
            Renderer.canvas.height);

        // Wall (left)
        ctx.drawImage(this.wallsImage, 0, 0, this.spriteWallsSideWidth, Renderer.canvas.height, 0,
            -Renderer.canvas.height, this.spriteWallsSideWidth, Renderer.canvas.height);
        ctx.drawImage(this.wallsImage, 0, 0, this.spriteWallsSideWidth, Renderer.canvas.height, 0, 0,
            this.spriteWallsSideWidth, Renderer.canvas.height);

        // Wall (right)
        ctx.drawImage(this.wallsImage, 0, 0, this.spriteWallsSideWidth, Renderer.canvas.height,Renderer.canvas.width -
            this.spriteWallsSideWidth, -Renderer.canvas.height, this.spriteWallsSideWidth, Renderer.canvas.height);
        ctx.drawImage(this.wallsImage, 0, 0, this.spriteWallsSideWidth, Renderer.canvas.height, Renderer.canvas.width -
            this.spriteWallsSideWidth, 0, this.spriteWallsSideWidth, Renderer.canvas.height);

        ctx.fill();
        ctx.translate(0, -this.y); // undo translation, this is faster than saving/restoring the context
    }
});