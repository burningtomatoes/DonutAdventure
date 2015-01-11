var Player = Entity.extend({
    spriteBody: null,
    spriteShadow: null,

    movementBob: 0,
    movementBobTimer: 0,

    isPlayer: true,

    init: function() {
        this.spriteBody = Sprites.load('player'); // TODO Draw my own sprite, temporary filler
        this.spriteShadow = Sprites.load('shadow');
        this.height = 41;
        this.width = 66;
        this.posX = (Renderer.canvas.width / 2) - (this.width / 2);
        this.posY = Renderer.canvas.height - (this.height * 2);
    },

    pickUp: function(object) {
        console.log('pick up', object);
        Map.remove(object);
    },

    update: function() {
        /** Movement bob (shift left and right to fake the look of movement) **/
        this.movementBobTimer++;

        if (this.movementBobTimer > 10) {
            var intensity = 2;
            this.movementBob = this.movementBob == intensity ? -intensity : intensity;
            this.movementBobTimer = 0;
        }

        /** Check collisions **/
        var entities = Map.checkCollisions.bind(Map)(this);
        var entitiesLength = entities.length;

        for (var i = 0; i < entitiesLength; i++) {
            var e = entities[i];

            if (e.isPickup) {
                this.pickUp(e);
            }
        }

        /** Player input **/
        if (Keyboard.isKeyDown(KeyEvent.DOM_VK_LEFT) && this.posX > 16) {
            this.posX -= Map.velocity * 2;
        }

        if (Keyboard.isKeyDown(KeyEvent.DOM_VK_RIGHT) && this.posX < Renderer.canvas.width - 16 - this.width) {
            this.posX += Map.velocity * 2;
        }
    },

    draw: function(ctx) {
        ctx.drawImage(this.spriteShadow, 0, 0, this.width, this.height, this.posX, this.posY + 5, this.width, this.height);
        ctx.drawImage(this.spriteBody, 0, 0, this.width, this.height, this.posX + this.movementBob, this.posY, this.width, this.height);
    }
});