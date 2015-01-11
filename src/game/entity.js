var Entity = Class.extend({
    posX: 0,
    posY: 0,
    height: 16,
    width: 16,

    causesCollision: true,

    getPosition: function() {
        return {
            posX: this.posX,
            posY: this.posY
        }
    },

    getWorldSize: function() {
        return {
            height: this.worldHeight,
            width: this.worldWidth
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
    },

    getRect: function() {
        var obj = {
            top:        this.posY,
            left:       this.posX,
            width:      this.width,
            height:     this.height,
            right:      0,
            bottom:     0
        };
        obj.right = obj.left + obj.width;
        obj.bottom = obj.top + obj.height;
        return obj;
    }
});