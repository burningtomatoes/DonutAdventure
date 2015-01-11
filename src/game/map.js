var Map = {
    entities: [],
    velocity: 3,
    scanlinesSprite: null,
    debugCollisions: false,

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

            if (e == null) {
                continue;
            }

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

            if (this.debugCollisions && e.getRect) {
                var sq = e.getRect();

                ctx.beginPath();
                ctx.rect(sq.left, sq.top, sq.width, sq.height);
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'red';
                ctx.stroke();
            }
        }

        // Scanlines effect
        if (this.scanlinesSprite != null) {
            ctx.drawImage(this.scanlinesSprite, 0, 0, Renderer.canvas.width, Renderer.canvas.height, 0, 0, Renderer.canvas.width, Renderer.canvas.height);
        }
    },

    checkCollisions: function(object) {
        var entities = this.entities.length;
        var collisions = [];

        var ourRect = object.getRect();

        for (var i = 0; i < entities; i++) {
            var e = this.entities[i];

            if (typeof e == 'undefined' || !e.causesCollision) {
                continue;
            }

            if (Utils.rectIntersects(e.getRect(), ourRect)) {
                collisions.push(e);
            }
        }

        return collisions;
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