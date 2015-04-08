var BaseView = require('./base'),
    $ = require('jquery'),
    RowView = Object.create(BaseView),
    CellView = require('./cell');

RowView.initialize({
    template: require('../templates/row.hbs'),
    container: "#game",
    render: function () {
        "use strict";
        this.$el = $().add(this.template());
        this.renderCells();
        $(this.container).append(this.$el);
    },
    renderCells: function () {
        "use strict";
        var i,
            cell;
        for (i = 0; i < this.cells.length; i++) {
            cell = Object.create(CellView);
            cell.initialize({
                container: this.$el,
                startingValue: this.cells[i],
                row: this.row,
                column: i
            });
            cell.render();
        }
    }
});

module.exports = RowView;
