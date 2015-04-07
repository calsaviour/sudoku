var app = {
    initialize: function () {
        "use strict";
        var $ = require('jquery');
        $(document).ready(function () {
            var game = require('./views/game');
            game.render();
        });
    }
};

module.exports = app;
app.initialize();
