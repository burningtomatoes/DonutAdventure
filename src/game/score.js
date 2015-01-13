var Score = {
    current: 0,
    donuts: 0,
    veggie: 0,
    isGameOver: false,
    updateLoopTime: 0,
    speedIncrementTime: 0,

    init: function() {
        this.updateUi();
    },

    updateUi: function() {
        $('#score').text(this.getString());

        var $fiveADay = $('#fiveaday');

        for (var i = 1; i <= 5; i++) {
            var $step = $fiveADay.find('.step.s' + i);

            if (this.veggie >= i) {
                $step.addClass('active');
            } else {
                $step.removeClass('active');
            }
        }

        $('#speed').text('Speed x' + (Map.velocity - Map.STARTING_VELOCITY + 1));

        if (Map.velocity <= 0) {
            $('#speed').hide();
        } else {
            $('#speed').show();
        }
    },

    getString: function() {
        var paddedLength = 6;
        var scoreString = Math.round(this.current).toString();
        var toPad = paddedLength - scoreString.length;

        if (toPad > 0) {
            for (var i = 0; i < toPad; i++) {
                scoreString = "0" + scoreString;
            }
        }

        return scoreString;
    },

    addScore: function(amt) {
        this.current += amt;

        if (this.current < 0) {
            this.current = 0;
        }
    },

    addDonut: function() {
        this.donuts++;
        this.addScore(100);
    },

    addVeggie: function() {
        if (this.veggie >= 5) {
            return;
        }

        this.veggie++;
        this.addScore(-250);

        if (this.veggie >= 5 && !this.isGameOver) {
            Map.player.puke();
            this.gameOver("Watch out for your five a day! It keeps the doctor away!<br />(That's not what we want)");
        }
    },

    update: function() {
        if (this.isGameOver && Keyboard.wasKeyPressed(KeyEvent.DOM_VK_SPACE)) {
            Map.newGame();
        }

        if (this.updateLoopTime > 0) {
            this.updateLoopTime--;
        }

        if (this.updateLoopTime <= 0) {
            if (!this.isGameOver) {
                this.addScore(10 * (Map.velocity - Map.STARTING_VELOCITY));
            }

            this.updateUi();
            this.updateLoopTime = 15; // 250ms, or something like that
        }

        if (this.speedIncrementTime > 0) {
            this.speedIncrementTime--;
        }

        if (this.speedIncrementTime <= 0 && !this.isGameOver) {
            Map.velocity += 0.5;
            this.speedIncrementTime = (60 * 10); // Every ten seconds or so
        }
    },

    gameOver: function(reason) {
        if (this.isGameOver) {
            return;
        }

        Map.player.omnomTimer = -1;

        this.isGameOver = true;

        Map.velocity = 0;

        var $gameOver = $('#gameover');
        $gameOver.find('.reason').html(reason);
        $gameOver.slideDown();
    },

    reset: function() {
        this.isGameOver = false;
        this.current = 0;
        this.donuts = 0;
        this.veggie = 0;
        this.updateLoopTime = 0;
        this.speedIncrementTime = 0;
    }
};