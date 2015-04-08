var $ = require('jquery'),
    _ = require('underscore'),
    BaseView = {
        initialize: function (options) {
            "use strict";
            _.extend(this, options);
            this.setElement();
            if (this.$el) {
                this.delegateEvents();
            }
            return this;
        },
        setElement: function () {
            if (!this.$el && this.el) {
                this.$el = $(this.el);
            }
        },
        delegateEvents: function () {
            "use strict";
            var event,
                events = this.events || {};
            for (event in events) {
                if (events.hasOwnProperty(event)) {
                    this.$el.on(event, this[events[event]]);
                }
            }
        }
    };

module.exports = BaseView;
