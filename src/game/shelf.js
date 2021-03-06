var Shelf = Entity.extend({
    sprite: null,
    right: false,

    init: function(right) {
        this.width = 48;
        this.height = 100;
        this.posY = -(this.height);

        var unitId = Math.ceil(Math.random() * 5);
        this.sprite = Sprites.load('shelving_unit_' + unitId);

        this.right = right;

        if (this.right) {
            this.posX = Renderer.canvas.width - (16 - 1) - this.width;
        } else {
            this.posX = 16 - 1;
        }
    },

    update: function() {
        this.posY += Map.velocity;

        if (this.isOutOfScreen()) {
            Map.remove(this);
            return;
        }
    },

    onPickup: function(player) {
        Map.remove(this);
    },

    draw: function(ctx) {
        ctx.save();

        if (this.right) {
            // Configure canvas to mirror
            ctx.translate(this.posX + this.width, this.posY);
            ctx.scale(-1, 1);
        } else {
            ctx.translate(this.posX, this.posY);
        }

        ctx.drawImage(this.sprite, 0, 0, this.width, this.height, 0, 0, this.width, this.height);

        ctx.restore();
    }
});