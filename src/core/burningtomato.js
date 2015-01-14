var BurningTomato = {
    show: function(cb) {
        Sfx.play('burningtomato');
        $('#burningtomato').delay(500).fadeIn(500, function() {
            window.setTimeout(function() {
                $('#burningtomato').fadeOut(500, cb);
            }, 1500)
        });
    }
};