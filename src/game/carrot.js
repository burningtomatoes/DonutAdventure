var Carrot = Pickup.extend({
    spritePickup: null,
    spriteShadow: null,

    isDonut: true,

    init: function() {
        this._super();

        this.spritePickup = Sprites.load('carrot');
        this.spriteShadow = Sprites.load('shadow_carrot');
        this.height = 39;
        this.width = 32;
    },

    onPickup: function(player) {
        Sfx.pickupVeggie();

        player.burpBuildup = -1;
        player.omnomTimer = 10;
        player.disgusted = true;

        Score.addVeggie();

        this._super(player);
    }
});