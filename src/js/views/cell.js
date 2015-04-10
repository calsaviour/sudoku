var BaseView = require('./base'),
    $ = require('jquery'),
    CellView = Object.create(BaseView);

CellView.initialize({
    template: require('../templates/cell.hbs'),
    events: {
        "keyup": "handleAnswer"
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
        this.board.update(this.row, this.column, value);
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
