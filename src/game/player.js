var Player = Entity.extend({
    spriteBody: null,
    spriteShadow: null,

    movementBob: 0,
    movementBobTimer: 0,

    init: function() {
        this.spriteBody = Sprites.load('player'); // TODO Draw my own sprite, temporary filler
        this.spriteShadow = Sprites.load('shadow');
        this.height = 41;
        this.width = 66;
        this.posX = (Renderer.canvas.width / 2) - (this.width / 2);
        this.posY = Renderer.canvas.height - (this.height * 2);
    },

    update: function() {
        this.movementBobTimer++;

        if (this.movementBobTimer > 10) {
            var intensity = 2;
            this.movementBob = this.movementBob == intensity ? -intensity : intensity;
            this.movementBobTimer = 0;
        }
    },

    draw: function(ctx) {
        ctx.drawImage(this.spriteShadow, 0, 0, this.width, this.height, this.posX, this.posY + 5, this.width, this.height);
        ctx.drawImage(this.spriteBody, 0, 0, this.width, this.height, this.posX + this.movementBob, this.posY, this.width, this.height);
    }
});