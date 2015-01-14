var Letter = {
    seen: false,
    showing: false,
    cb: null,

    show: function(cb) {
        this.cb = cb;

        $('#dim').fadeIn('slow');

        $('#letter')
            .stop()
            .css('bottom', '-600px')
            .css('opacity', '0')
            .show()
            .animate({
                opacity: '1.0',
                bottom: '+=625px'
            }, '2000', function() {
                window.setTimeout(function() {
                    Sfx.play('ugh');
                }, 1000);
            });

        Sfx.play('letter');

        this.seen = true;
        this.showing = true;
    },

    update: function() {
        if (this.showing && Keyboard.wasKeyPressed(KeyEvent.DOM_VK_SPACE)) {
            this.hide();
        }
    },

    hide: function() {
        this.seen = true;
        this.showing = false;

        $('#dim').fadeOut('fast');
        $('#letter').fadeOut('fast', this.cb);
    }
};