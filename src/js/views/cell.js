var BaseView = require('./base'),
    CellView = Object.create(BaseView);

CellView.initialize({
    template: require('../templates/cell.hbs'),
    initialize: function (options) {
        "use strict";
        this.container = options.container;
        this.startingValue = options.startingValue;
    },
    events: {
        "keyUp": "handleAnswer"
    },
    handleAnswer: function () {
        "use strict";
    },
    render: function () {
        "use strict";
        this.container.append(this.template({
            startingValue: this.startingValue
        }));
    }
});

module.exports = CellView;
