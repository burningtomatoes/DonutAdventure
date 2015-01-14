var Sprites = {
    data: {},

    clear: function () {
        this.data = {};
    },

    load: function (fileName) {
        fileName = 'assets/sprites/' + fileName + '.png';

        if (typeof this.data[fileName] === 'undefined') {
            this.data[fileName] = new Image();
            this.data[fileName].src = fileName;
            console.info('[Sprites] Loaded sprite', fileName);
        }

        return this.data[fileName];
    },

    preload: function () {
        this.load('floor');
        this.load('brickwall_side');

        this.load('shadow');
        this.load('shadow_pickup');
        this.load('shadow_carrot');

        this.load('player');
        this.load('player_down');

        this.load('donut');
        this.load('carrot');

        this.load('shelving_unit_1');
        this.load('shelving_unit_2');
        this.load('shelving_unit_3');
        this.load('shelving_unit_4');
        this.load('shelving_unit_5');

        this.load('spillage');
        this.load('cardboard_box');
    }
};