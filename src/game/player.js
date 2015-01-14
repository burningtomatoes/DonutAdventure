var Player = Entity.extend({
    spriteBody: null,
    spriteShadow: null,
    spriteFalling: null,

    movementBob: 0,
    movementBobTimer: 0,

    isPlayer: true,

    burpBuildup: 0,
    omnomTimer: 0,
    disgusted: false,

    sfxRunning: null,

    falling: false,

    init: function() {
        this.spriteBody = Sprites.load('player');
        this.spriteShadow = Sprites.load('shadow');
        this.spriteFalling = Sprites.load('player_down');

        this.height = 41;
        this.width = 66;

        this.posX = (Renderer.canvas.width / 2) - (this.width / 2);
        this.posY = Renderer.canvas.height - (this.height * 2);
        this.sfxRunning = Sfx.load('running');

        this.setFalling(false);
    },

    setFalling: function(falling) {
        if (this.falling === falling) {
            return;
        }

        if (falling && !Score.isGameOver) {
            Sfx.tripup();
            Score.gameOver('You have fallen, brave warrior.<br />Watch out for rubbish.');
        }

        this.falling = falling;

        this.width = 66;

        if (this.falling) {
            this.height = 130;
        } else {
            this.height = 41;
        }
    },

    update: function() {
        if (!this.falling) {
            /** Movement bob (shift left and right to fake the look of movement) **/
            this.movementBobTimer++;

            if (this.movementBobTimer > 10) {
                if (Map.velocity > 0) {
                    var intensity = 2;
                    this.movementBob = this.movementBob == intensity ? -intensity : intensity;
                } else {
                    this.movementBob = 0;
                }
                this.movementBobTimer = 0;
            }

            /** Eating sounds **/
            if (this.omnomTimer > 0) {
                this.omnomTimer--;

                if (this.omnomTimer <= 0) {
                    if (this.disgusted) {
                        Sfx.ugh();
                        this.disgusted = false;
                    } else if (this.burpBuildup > 3) {
                        Sfx.burp();
                        this.burpBuildup = 0;
                    } else {
                        Sfx.omNom();
                    }
                }

            }

            /** Check collisions **/
            var entities = Map.checkCollisions(this);
            var entitiesLength = entities.length;

            for (var i = 0; i < entitiesLength; i++) {
                var e = entities[i];

                if (e.isPickup) {
                    e.onPickup(this);
                    continue;
                }

                if (e.isObstacle) {
                    this.setFalling(true);
                    break;
                }
            }

            /** Player input **/
            if ((Keyboard.isKeyDown(KeyEvent.DOM_VK_LEFT) || Keyboard.isKeyDown(KeyEvent.DOM_VK_A)) && this.posX > 16 + 48) {
                this.posX -= Map.velocity * 2;
            }

            if ((Keyboard.isKeyDown(KeyEvent.DOM_VK_RIGHT) || Keyboard.isKeyDown(KeyEvent.DOM_VK_D)) && this.posX < Renderer.canvas.width - 16 - 48 - this.width) {
                this.posX += Map.velocity * 2;
            }
        }

        /** Running sfx **/
        if (Map.velocity == 0 || this.falling) {
            if (!this.sfxRunning.ended) {
                this.sfxRunning.pause();
                this.sfxRunning.currentTime = 0;
            }
        } else {
            if (!this.sfxRunning.ended) {
                this.sfxRunning.play();
                this.sfxRunning.volume = 0.5;
                this.sfxRunning.loop = true;
            }
        }

        if (this.falling && Map.velocity > 0) {
            Map.velocity -= 0.05;

            if (Map.velocity <= 0) {
                Map.velocity = 0;
                Sfx.faceplant();
                this.puke();
            }
        }
    },

    puke: function() {
        Sfx.puke();

        var spillage = new Puke();
        spillage.posX = this.posX;
        spillage.posY = this.posY - 24;
        Map.add(spillage);
    },

    draw: function(ctx) {
        if (this.falling) {
            ctx.drawImage(this.spriteFalling, 0, 0, this.width, this.height, this.posX, this.posY - 5, this.width, this.height);
        } else {
            if (Score.scoreStreak > 1) {
                var textPosX = this.posX + (this.width / 2);
                var textPosY = this.posY - 5;

                ctx.font = '24px Munro';
                ctx.fillStyle = '#000';
                ctx.fillText('x' + Score.scoreStreak, textPosX + 1, textPosY + 1); // shadow
                ctx.fillStyle = Score.scoreStreak > 10 ? 'red' : 'yellow';
                ctx.fillText('x' + Score.scoreStreak, textPosX, textPosY);
            }

            ctx.drawImage(this.spriteShadow, 0, 0, this.width, this.height, this.posX, this.posY + 5, this.width, this.height);
            ctx.drawImage(this.spriteBody, 0, 0, this.width, this.height, this.posX + this.movementBob, this.posY, this.width, this.height);
        }
    }
});