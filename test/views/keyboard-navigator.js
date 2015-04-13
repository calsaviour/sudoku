var KeyboardNavigator = require('../../src/js/views/keyboard-navigator'),
    chai = require('chai'),
    expect = chai.expect,
    $ = require('jquery');

describe("Keyboard navigator", function () {
    "use strict";
    describe("handleKeyNav", function () {
        it ("calls this.focusLeft when key code is 37", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusLeft = function () {
                done();
            };
            nav.handleKeyNav({
                keyCode: 37,
                preventDefault: function () {}
            });
        });
        it ("calls this.focusUp when key code is 38", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusUp = function () {
                done();
            };
            nav.handleKeyNav({
                keyCode: 38,
                preventDefault: function () {}
            });
        });
        it ("calls this.focusRight when key code is 39", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusRight = function () {
                done();
            };
            nav.handleKeyNav({
                keyCode: 39,
                preventDefault: function () {}
            });
        });
        it ("calls this.focusDown when key code is 40", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusDown = function () {
                done();
            };
            nav.handleKeyNav({
                keyCode: 40,
                preventDefault: function () {}
            });
        });
        it ("calls event.preventDefault when key code is 38", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusUp = function () {};
            nav.handleKeyNav({
                keyCode: 38,
                preventDefault: function () {
                    done();
                }
            });
        });
        it ("calls event.preventDefault when key code is 40", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusDown = function () {};
            nav.handleKeyNav({
                keyCode: 40,
                preventDefault: function () {
                    done();
                }
            });
        });
    });
});
