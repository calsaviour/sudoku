var BaseView = require('./base'),
    $ = require('jquery'),
    _ = require('underscore'),
    GameView = Object.create(BaseView),
    RowView = require('./row'),
    Board = require('../models/board'),
    WinnerView = require('./winner'),
    KeyboardNavigator = require('./keyboard-navigator');

GameView.initialize({
    el: "#content",
    template: require('../templates/game.hbs'),
    board: Object.create(Board),
    boardEvents: {
        "invalidRow": "highlightInvalidRow",
        "invalidColumn": "highlightInvalidColumn",
        "invalidRegion": "highlightInvalidRegion",
        "wonGame": "showWinnerDialog",
        "updated": "clearHighlights"
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
        this.keyboardNavigator = Object.create(KeyboardNavigator);
        this.keyboardNavigator.initialize({
            el: "#content",
            board: this.board
        });
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
    highlightInvalidRow: function (event, row) {
        $('#game .row-' + row).addClass('invalid');
    },
    highlightInvalidColumn: function (event, column) {
        $('#game .column-' + column).addClass('invalid');
    },
    highlightInvalidRegion: function (event, region) {
        $('#game .region-' + region).addClass('invalid');
    },
    showWinnerDialog: function (event) {
        var winner = Object.create(WinnerView);
        winner.render();
    },
    clearHighlights: function (event) {
        $('.cell').removeClass('invalid');
    }
});

module.exports = GameView;
