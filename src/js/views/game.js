var BaseView = require('./base'),
    $ = require('jquery'),
    _ = require('underscore'),
    GameView = Object.create(BaseView),
    RowView = require('./row'),
    Board = require('../models/board'),
    WinnerView = require('./winner');

GameView.initialize({
    el: "#content",
    template: require('../templates/game.hbs'),
    board: Object.create(Board),
    events: {
        "keydown": "handleKeyNav"
    },
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
        var cell = $(event.target),
            row = cell.data('row'),
            column = cell.data('column');
        switch (event.keyCode) {
            case 37: // Left
                this.focusLeft(row, column);
                break;
            case 38: // Up
                this.focusUp(row, column);
                break;
            case 39: // Right
                this.focusRight(row, column);
                break;
            case 40: // Down
                this.focusDown(row, column);
                break;
        }
    },
    focusIfEditableCell: function (row, column) {
        var el = $('#game .cell.editable.row-' + row + '.column-' + column);
        if (el.length > 0) {
            el.focus().select();
            return true;
        }
        return false;
    },
    focusLeft: function (row, column) {
        column = column - 1;
        if (this.focusIfEditableCell(row, column)) {
            return;
        }
        if (column > 0) {
            this.focusLeft(row, column);
        }
    },
    focusRight: function (row, column) {
        column = column + 1;
        if (this.focusIfEditableCell(row, column)) {
            return;
        }
        if (column < this.board.currentState.rows[0].length) {
            this.focusRight(row, column);
        }
    },
    focusUp: function (row, column) {
        row = row - 1;
        if (this.focusIfEditableCell(row, column)) {
            return;
        }
        if (row > 0) {
            this.focusUp(row, column);
        }
    },
    focusDown: function (row, column) {
        row = row + 1;
        if (this.focusIfEditableCell(row, column)) {
            return;
        }
        if (row < this.board.currentState.rows.length) {
            this.focusDown(row, column);
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
