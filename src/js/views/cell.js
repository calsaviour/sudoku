var BaseView = require('./base'),
    $ = require('jquery'),
    CellView = Object.create(BaseView);

CellView.initialize({
    template: require('../templates/cell.hbs'),
    events: {
        "keyup": "handleAnswer",
        "click": "select"
    },
    getRegion: function () {
        return this.board.getRegion(this.row, this.column);
    },
    handleAnswer: function (event) {
        "use strict";
        var cell = $(event.target),
            value = parseInt(cell.val(), 10);
        if (!this.board.isValidValue(value)) {
            cell.val('');
        }
        cell.select();
        this.board.update(this.row, this.column, value);
    },
    select: function (event) {
        $(event.target).select();
    },
    render: function () {
        "use strict";
        this.$el = $().add(this.template({
            startingValue: this.startingValue,
            row: this.row,
            column: this.column,
            region: this.getRegion()
        }));
        this.container.append(this.$el);
        this.delegateEvents();
    }
});

module.exports = CellView;
