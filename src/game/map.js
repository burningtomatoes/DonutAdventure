var Map = {
    STARTING_VELOCITY: 3,

    entities: [],
    velocity: 0,
    posY: 0,
    lastPosY: 0,
    scanlinesSprite: null,
    debugCollisions: false,
    player: null,
    active: false,

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

        // Spawn random donuts and carrots
        if (Map.velocity > 0) {
            if (Math.random() >= 0.975) {
                var donut = new Donut();
                donut.posX = MathHelper.clamp(Math.round(Math.random() * Renderer.canvas.width), 16 + 48, Renderer.canvas.width - 16 - donut.width - 48);
                donut.posY = -donut.height;
                this.add(donut);
            }

            if (Math.random() >= 0.99) {
                var carrot = new Carrot();
                carrot.posX = MathHelper.clamp(Math.round(Math.random() * Renderer.canvas.width), 16 + 48, Renderer.canvas.width - 16 - carrot.width - 48);
                carrot.posY = -carrot.height;
                this.add(carrot);
            }

            if (Math.random() >= 0.99) {
                var obstacle = new Obstacle();
                obstacle.posX = MathHelper.clamp(Math.round(Math.random() * Renderer.canvas.width), 16 + 48, Renderer.canvas.width - 16 - obstacle.width - 48);
                obstacle.posY = -obstacle.height;
                this.add(obstacle);
            }
        }

        // Spawn shelves every 100px (shelf height)
        var diff = this.posY - this.lastPosY;

        if (diff >= 100) {
            this.add(new Shelf(false));
            this.add(new Shelf(true));
            this.lastPosY = this.posY;
        }

        // Track Y Pos
        this.posY += this.velocity;
    },

    draw: function(ctx) {
        var entitiesCount = this.entities.length;

        var renderEntity = function(e) {
            e.draw(ctx);

            if (this.debugCollisions && e.getRect) {
                var sq = e.getRect();

                ctx.beginPath();
                ctx.rect(sq.left, sq.top, sq.width, sq.height);
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'red';
                ctx.stroke();
            }
        }.bind(this);

        for (var i = 0; i < entitiesCount; i++) {
            var e = this.entities[i];

            if (e === Map.player) {
                // Player always renders last (on top)
                continue;
            }

            renderEntity(e);
        }

        if (Map.player != null) {
            renderEntity(Map.player);
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

    prepareWorld: function() {
        if (this.scanlinesSprite == null) {
            this.scanlinesSprite = Sprites.load('scanlines');
        }

        this.velocity = 0;

        this.add(new Floor());

        for (var i = 0; i < 100; i++) {
            var donut = new Donut();
            donut.posX = MathHelper.clamp(Math.round(Math.random() * Renderer.canvas.width), 16 + 48, Renderer.canvas.width - 16 - donut.width - 48);
            donut.posY = Math.round(Math.random() * Renderer.canvas.height);
            this.add(donut);
        }

        Renderer.$canvas.delay(100).fadeIn('slow');
    },

    newGame: function() {
        if (this.startingGame) {
            return;
        }

        this.startingGame = true;

        if (this.scanlinesSprite == null) {
            this.scanlinesSprite = Sprites.load('scanlines');
        }

        $('#gameover').slideUp();

        var startGame = function() {
            this.velocity = Map.STARTING_VELOCITY;
            this.posY = 0;
            this.lastPosY = 0;
            this.active = true;

            Score.reset();
            Score.updateUi();

            this.clear();
            this.add(new Floor());
            this.player = new Player();
            this.add(this.player);

            Renderer.$canvas.delay(100).fadeIn('slow');
            this.startingGame = false;
        }.bind(this);

        if (Renderer.$canvas.is(':visible')) {
            Renderer.$canvas.fadeOut('slow', function() {
                startGame();
            });
        } else {
            startGame();
        }
    }
};