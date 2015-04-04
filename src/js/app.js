var app = {
    init: function () {
        "use strict";
        var $ = require('jquery');
        $(document).ready(function () {
            var game = require('./views/game');
            game.render();
        });
    }
};

module.exports = app;
app.init();
