var BaseView = require('./base'),
    $ = require('jquery'),
    _ = require('underscore'),
    ValidationHighlighter = Object.create(BaseView);

ValidationHighlighter.initialize({
    boardEvents: {
        "invalidRow": "highlightInvalidRow",
        "invalidColumn": "highlightInvalidColumn",
        "invalidRegion": "highlightInvalidRegion",
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
    clearHighlights: function (event) {
        $('.cell').removeClass('invalid');
    }
});

module.exports = ValidationHighlighter;
