var Sfx = {
    sounds: { },

    preload: function() {
        this.load('pickup_donut');
        this.load('pickup_veggie');
        this.load('omnom');
        this.load('burp');
        this.load('running');
        this.load('puke');
        this.load('ugh');
        this.load('letter');
        this.load('burningtomato');
        this.load('tripup');
        this.load('faceplant');
    },

    load: function(soundId) {
        if (typeof Sfx.sounds[soundId] != 'undefined') {
            return Sfx.sounds[soundId];
        }

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
    pickupVeggie: function ()   { this.play('pickup_veggie'); },
    omNom: function()           { this.play('omnom'); },
    burp: function()            { this.play('burp'); },
    puke: function()            { this.play('puke'); },
    ugh: function()             { this.play('ugh'); },
    letter: function()          { this.play('letter'); },
    tripup: function()          { this.play('tripup'); },
    faceplant: function()       { this.play('faceplant'); }
};