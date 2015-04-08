var BaseView = require('./base'),
    $ = require('jquery'),
    GameView = Object.create(BaseView),
    RowView = require('./row'),
    board = require('../models/board');

GameView.initialize({
    el: "#content",
    template: require('../templates/game.hbs'),
    board: board,
    events: {
        "keyUp": "handleKeyNav"
    },
    render: function () {
        "use strict";
        var innerHtml = this.template();
        $(this.el).html(innerHtml);
        this.board.generate();
        this.renderRows();
    },
    renderRows: function () {
        "use strict";
        var i,
            row;
        for (i = 0; i < this.board.startingState.rows.length; i++) {
            row = Object.create(RowView);
            row.initialize({
                row: i,
                cells: this.board.startingState.rows[i]
            });
            row.render();
        }
    },
    handleKeyNav: function (event) {
        "use strict";
    }
});

module.exports = GameView;
