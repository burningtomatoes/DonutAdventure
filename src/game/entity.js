var Entity = Class.extend({
    posX: 0,
    posY: 0,
    worldHeight: 16,
    worldWidth: 16,

    getPosition: function() {
        return {
            posX: this.posX,
            posY: this.posY
        }
    },

    getWorldSize: function() {
        return {
            worldHeight: this.worldHeight,
            worldWidth: this.worldWidth
        }
    },

    update: function() {
        // ...
    },

    draw: function(ctx) {
        // ...
    },

    isOutOfScreen: function() {
        return this.posY >= Renderer.canvas.height;
    }
});