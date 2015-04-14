var BaseView = require('./base'),
    $ = require('jquery'),
    WinnerView = Object.create(BaseView);

WinnerView.initialize({
    template: require('../templates/winner.hbs'),
    container: "#content",
    gameSelector: "#game",
    render: function () {
        "use strict";
        this.$el = $().add(this.template());
        $(this.gameSelector).remove();
        $(this.container).append(this.$el);
        $('#play-again').on('click', this.restartGame);
    },
    restartGame: function (event) {
        "use strict";
        event.preventDefault();
        require('../app').initialize();
    }
});

module.exports = WinnerView;
