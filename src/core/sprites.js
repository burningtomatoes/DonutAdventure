var Sprites = {
    data: { },

    clear: function() {
        this.data = { };
    },

    load: function(fileName) {
        fileName = 'assets/sprites/' + fileName + '.png';

        if (typeof this.data[fileName] === 'undefined') {
            this.data[fileName] = new Image();
            this.data[fileName].src = fileName;
            console.info('[Sprites] Loaded sprite', fileName);
}

return this.data[fileName];
},

preload: function() {
    this.load('floor');
    this.load('shadow');
    this.load('shadow_pickup');
    this.load('player');
    this.load('brickwall_side');
    this.load('donut');
}
};