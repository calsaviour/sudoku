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
            "use strict";
            if (!this.$el && this.el) {
                this.$el = $(this.el);
            }
        },
        delegateEvents: function () {
            "use strict";
            var event,
                events = this.events || {},
                method;
            for (event in events) {
                if (events.hasOwnProperty(event)) {
                    method = _.bind(this[events[event]], this);
                    this.$el.on(event, method);
                }
            }
        }
    };

module.exports = BaseView;
