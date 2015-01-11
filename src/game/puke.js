var Puke = Entity.extend({
    pukeAnim: null,

    init: function() {
        this.height = 32;
        this.width = 32;
        this.pukeAnim = new Animation('assets/sprites/puke.png', 32, 32, 10, 3, false);
    },

    update: function() {
        this.pukeAnim.update();
    },

    onPickup: function(player) {
        Map.remove(this);
    },

    draw: function(ctx) {
        this.pukeAnim.draw(ctx, this.posX + 16, this.posY);
    }
});