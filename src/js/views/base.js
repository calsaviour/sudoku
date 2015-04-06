var $ = require('jquery'),
    _ = require('underscore'),
    BaseView = {
        initialize: function (options) {
            "use strict";
            _.extend(this, options);
            this.delegateEvents();
            return this;
        },
        delegateEvents: function () {
            "use strict";
            var event,
                events = this.events || {};
            for (event in events) {
                if (events.hasOwnProperty(event)) {
                    $(this.el).on(event, this[events[event]]);
                }
            }
        }
    };

module.exports = BaseView;
