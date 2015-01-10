var Floor = Class.extend({
    sprite: null,
    y: 0,

    init: function() {
        this.spriteBody = Sprites.load('floor');
    },

    update: function() {
        this.y += Map.velocity;
    },

    draw: function(ctx) {
        var pattern = ctx.createPattern(this.spriteBody, "repeat");

        ctx.save();
        ctx.translate(0, this.y);
        ctx.rect(0, -Renderer.canvas.height, Renderer.canvas.width, Renderer.canvas.height * 2);
        ctx.fillStyle = pattern;
        ctx.fill();
        ctx.restore();
    }
});