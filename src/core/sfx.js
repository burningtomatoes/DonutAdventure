var Sfx = {
    sounds: { },

    preload: function() {
        this.load('pickup_donut');
        this.load('omnom');
        this.load('burp');
        this.load('running');
    },

    load: function(soundId) {
        console.info('[SFX] Loading sound effect', soundId);
        Sfx.sounds[soundId] = new Audio('assets/sfx/' + soundId + '.wav');
        Sfx.sounds[soundId].load();
        return Sfx.sounds[soundId];
    },

    play: function(soundId) {
        if (typeof Sfx.sounds[soundId] == 'undefined') {
            Sfx.load(soundId);
        } else {
            Sfx.sounds[soundId].load(); // call load() every time to fix Chrome issue where sound only plays first time
        }

        Sfx.sounds[soundId].play();
    },

    pickupDonut: function ()    { this.play('pickup_donut'); },
    omNom: function()           { this.play('omnom'); },
    burp: function()            { this.play('burp'); }
};