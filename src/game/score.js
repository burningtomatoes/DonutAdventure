var Score = {
    current: 0,
    donuts: 0,
    veggie: 0,

    init: function() {
        window.setInterval(this.updateUi.bind(this), 250);
        this.updateUi();
    },

    updateUi: function() {
        $('#score').text(this.getString());
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
    },

    addDonut: function() {
        this.donuts++;
        this.addScore(100);
    },

    addVeggie: function() {
        this.veggie++;
        this.addScore(-250);
    },

    reset: function() {
        this.current = 0;
        this.donuts = 0;
        this.veggie = 0;
    }
};