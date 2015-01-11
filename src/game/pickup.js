var Pickup = Entity.extend({
    spritePickup: null,
    spriteShadow: null,

    isPickup: true,
    isDonut: true,
    isCarrot: false,

    init: function() {
        this.height = 32;
        this.width = 32;
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
        ctx.drawImage(this.spriteShadow, 0, 0, this.width, this.height, this.posX + 1, this.posY + 2, this.width, this.height);
        ctx.drawImage(this.spritePickup, 0, 0, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }
});