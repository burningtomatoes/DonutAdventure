var Sfx = {
    sounds: { },

    preload: function() {
        // ...
    },

    load: function(soundId) {
        console.info('[SFX] Loading sound effect', soundId);

        Sfx.sounds[soundId] = new Audio('assets/sfx/' + soundId);
    },

    play: function(soundId) {
        if (typeof Sfx.sounds[soundId] == 'undefined') {
            Sfx.load(soundId);
        }

        Sfx.sounds[soundId].load(); // need to call load() to fix Chrome issue where sound only plays once
        Sfx.sounds[soundId].play();
    }
};