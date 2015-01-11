var Score = {
    current: 0,
    donuts: 0,
    veggie: 0,
    isGameOver: false,

    init: function() {
        var updateLoop = function() {
            if (!this.isGameOver) {
                this.addScore(10);
            }
            this.updateUi();
        }.bind(this);

        window.setInterval(updateLoop, 250);
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

        if (this.veggie >= 5) {
            this.gameOver("Watch out for your five a day! It keeps the doctor away!<br />(That's not what we want)");
        }
    },

    gameOver: function(reason) {
        if (this.isGameOver) {
            return;
        }

        this.isGameOver = true;

        Map.velocity = 0;

        var $gameOver = $('#gameover');
        $gameOver.find('h2').html(reason);
        $gameOver.slideDown();
    },

    reset: function() {
        this.current = 0;
        this.donuts = 0;
        this.veggie = 0;
    }
};