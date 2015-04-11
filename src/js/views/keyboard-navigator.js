var BaseView = require('./base'),
    $ = require('jquery'),
    _ = require('underscore'),
    KeyboardNavigator = Object.create(BaseView);

KeyboardNavigator.initialize({
    events: {
        "keydown": "handleKeyNav"
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
                event.preventDefault(); // Prevent number input cycling
                this.focusUp(row, column);
                break;
            case 39: // Right
                this.focusRight(row, column);
                break;
            case 40: // Down
                event.preventDefault(); // Prevent number input cycling
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
    }
});

module.exports = KeyboardNavigator;
