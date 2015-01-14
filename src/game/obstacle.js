var Obstacle = Entity.extend({
    sprite: null,
    isObstacle: true,

    init: function(right) {
        var unitId = Math.ceil(Math.random() * 2);

        switch (unitId) {
            case 1:
                this.sprite = Sprites.load('spillage');
                this.width = 87;
                this.height = 83;
                break;
            case 2:
            default:
                this.sprite = Sprites.load('cardboard_box');
                this.width = 45;
                this.height = 42;
                break;
        }
    },

    update: function() {
        this.posY += Map.velocity;

        if (this.isOutOfScreen()) {
            Map.remove(this);
            return;
        }
    },

    draw: function(ctx) {
        ctx.drawImage(this.sprite, 0, 0, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }
});