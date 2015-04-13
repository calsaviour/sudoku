var BaseView = require('./base'),
    $ = require('jquery'),
    _ = require('underscore'),
    GameView = Object.create(BaseView),
    RowView = require('./row'),
    Board = require('../models/board'),
    WinnerView = require('./winner'),
    KeyboardNavigator = require('./keyboard-navigator'),
    ValidationHighlighter = require('./validation-highlighter');

GameView.initialize({
    el: "#content",
    template: require('../templates/game.hbs'),
    board: Object.create(Board),
    boardEvents: {
        "wonGame": "showWinnerDialog"
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
        this.initializeDelegateViews();
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
    initializeDelegateViews: function () {
        this.keyboardNavigator = Object.create(KeyboardNavigator);
        this.keyboardNavigator.initialize({
            el: this.el,
            board: this.board
        });
        this.validationHighlighter = Object.create(ValidationHighlighter);
        this.validationHighlighter.initialize({
            el: this.el,
            board: this.board
        });
    },
    showWinnerDialog: function (event) {
        var winner = Object.create(WinnerView);
        winner.render();
    },
});

module.exports = GameView;
