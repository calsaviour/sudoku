var BaseView = require('./base'),
    $ = require('jquery'),
    _ = require('underscore'),
    GameView = Object.create(BaseView),
    RowView = require('./row'),
    Board = require('../models/board');

GameView.initialize({
    el: "#content",
    template: require('../templates/game.hbs'),
    board: Object.create(Board),
    events: {
        "keyUp": "handleKeyNav"
    },
    boardEvents: {
        "invalidRow": "handleInvalidRow",
        "invalidColumn": "handleInvalidColumn",
        "invalidRegion": "handleInvalidRegion",
        "wonGame": "handleWin",
        "updated": "handleBoardUpdate"
    },
    delegateEvents: function () {
        var event,
            method;
        for (event in this.boardEvents) {
            if (this.boardEvents.hasOwnProperty(event)) {
                method = _.bind(this[this.boardEvents[event]], this);
                $(this.board).on(event, method);
            }
        }
        Object.getPrototypeOf(this).delegateEvents.call(this);
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
                board: this.board,
                row: i,
                cells: this.board.startingState.rows[i]
            });
            row.render();
        }
    },
    handleKeyNav: function (event) {
        "use strict";
    },
    handleInvalidRow: function (event) {
        console.log(event);
    },
    handleInvalidColumn: function (event) {
        console.log(event);
    },
    handleInvalidRegion: function (event) {
        console.log(event);
    },
    handleWin: function (event) {
        console.log(event);
    },
    handleBoardUpdate: function (event) {
        console.log(event);
    }
});

module.exports = GameView;
