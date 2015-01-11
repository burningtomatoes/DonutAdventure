var Sfx = {
    sounds: { },

    preload: function() {
        this.load('pickup_donut');
        this.load('omnom');
        this.load('burp');
    },

    load: function(soundId) {
        console.info('[SFX] Loading sound effect', soundId);

        Sfx.sounds[soundId] = new Audio('assets/sfx/' + soundId + '.wav');
    },

    play: function(soundId) {
        if (typeof Sfx.sounds[soundId] == 'undefined') {
            Sfx.load(soundId);
        }

        Sfx.sounds[soundId].load(); // need to call load() to fix Chrome issue where sound only plays once
        Sfx.sounds[soundId].play();
    },

    pickupDonut: function ()    { this.play('pickup_donut'); },
    omNom: function()           { this.play('omnom'); },
    burp: function()            { this.play('burp'); }
};