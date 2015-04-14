/*jslint unparam: true*/

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
        "use strict";
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
        "use strict";
        $('#game .row-' + row).addClass('invalid');
    },
    highlightInvalidColumn: function (event, column) {
        "use strict";
        $('#game .column-' + column).addClass('invalid');
    },
    highlightInvalidRegion: function (event, region) {
        "use strict";
        $('#game .region-' + region).addClass('invalid');
    },
    clearHighlights: function (event) {
        "use strict";
        $('.cell').removeClass('invalid');
    }
});

module.exports = ValidationHighlighter;
