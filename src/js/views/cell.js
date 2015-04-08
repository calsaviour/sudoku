var BaseView = require('./base'),
    $ = require('jquery'),
    board = require('../models/board'),
    CellView = Object.create(BaseView);

CellView.initialize({
    template: require('../templates/cell.hbs'),
    events: {
        "keyup": "handleAnswer"
    },
    handleAnswer: function (event) {
        "use strict";
        var cell = $(event.target),
            value = parseInt(cell.val(), 10);
        if (!board.isValidValue(value)) {
            cell.val('');
            return;
        }
        board.update(this.row, this.column, value);
    },
    render: function () {
        "use strict";
        this.$el = $().add(this.template({
            startingValue: this.startingValue
        }));
        this.container.append(this.$el);
        this.delegateEvents();
    }
});

module.exports = CellView;
