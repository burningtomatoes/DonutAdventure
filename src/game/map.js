var Map = {
    entities: [],
    velocity: 3,
    scanlinesSprite: null,

    add: function(e) {
        this.entities.push(e);
    },

    remove: function(e) {
        var idx = this.entities.indexOf(e);

        if (idx >= 0) {
            this.entities.splice(idx, 1);
        }
    },

    clear: function() {
        this.entities = [];
    },

    update: function() {
        var entities = this.entities.length;

        for (var i = 0; i < entities; i++) {
            var e = this.entities[i];
            e.update();
        }

        // Spawn random donuts
        if (Math.random() >= 0.99) {
            var donut = new Pickup();
            donut.posX = MathHelper.clamp(Math.round(Math.random() * Renderer.canvas.width), 16, Renderer.canvas.width - 16 - donut.width);
            donut.posY = -donut.height;
            this.add(donut);

            console.log('Add donut.', donut.getPosition());
        }
    },

    draw: function(ctx) {
        var entities = this.entities.length;

        for (var i = 0; i < entities; i++) {
            var e = this.entities[i];
            e.draw(ctx);
        }

        // Scanlines effect
        if (this.scanlinesSprite != null) {
            ctx.drawImage(this.scanlinesSprite, 0, 0, Renderer.canvas.width, Renderer.canvas.height, 0, 0, Renderer.canvas.width, Renderer.canvas.height);
        }
    },

    startingGame: false,

    newGame: function() {
        if (this.startingGame) {
            return;
        }

        this.startingGame = true;

        if (this.scanlinesSprite == null) {
            this.scanlinesSprite = Sprites.load('scanlines');
        }

        var startGame = function() {
            this.clear();
            this.add(new Floor());
            this.add(new Player());

            Renderer.$canvas.delay(100).fadeIn('slow');
            this.startingGame = false;
        }.bind(this);

        if (Renderer.$canvas.is(':visible')) {
            Renderer.$canvas.fadeOut('slow', function() {
                startGame();
            })
        } else {
            startGame();
        }
    }
};