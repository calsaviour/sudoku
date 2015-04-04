var BaseView = require('./base'),
    $ = require ('jquery'),
    RowView = Object.create(BaseView),
    CellView = require('./cell');

RowView.initialize({
    template: require('../templates/row.hbs'),
    container: "#game",
    initialize: function (options) {
        "use strict";
        this.cells = options.cells;
    },
    render: function () {
        "use strict";
        this.$el = $().add('<div>');
        this.$el.html(this.template);
        this.renderCells();
        $(this.container).append(this.$el);
    },
    renderCells: function () {
        "use strict";
        var i;
        for (i = 0; i < this.cells.length; i++) {
            var cell = Object.create(CellView);
            cell.initialize({
                container: this.$el,
                startingValue: this.cells[i]
            });
            cell.render();
        }
    }
});

module.exports = RowView;
