var Donut = Pickup.extend({
    spritePickup: null,
    spriteShadow: null,

    isDonut: true,

    init: function() {
        this._super();

        this.spritePickup = Sprites.load('donut');
        this.spriteShadow = Sprites.load('shadow_pickup');
        this.height = 32;
        this.width = 32;
    },

    onPickup: function(player) {
        Sfx.pickupDonut();

        player.burpBuildup++;
        player.omnomTimer = 10;
        player.disgusted = false;

        Score.addDonut();

        this._super(player);
    }
});