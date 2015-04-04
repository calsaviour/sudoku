var BaseView = require('./base'),
    CellView = Object.create(BaseView);

CellView.initialize({
    template: require('../templates/cell.hbs'),
    initialize: function (options) {
        this.container = options.container;
        this.startingValue = options.startingValue;
    },
    events: {
        "keyUp": "handleAnswer"
    },
    handleAnswer: function () {

    },
    render: function () {
        this.container.append(this.template({
            startingValue: this.startingValue
        }));
    }
});

module.exports = CellView;
