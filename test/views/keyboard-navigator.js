var KeyboardNavigator = require('../../src/js/views/keyboard-navigator'),
    chai = require('chai'),
    expect = chai.expect,
    $ = require('jquery');

describe("Keyboard navigator", function () {
    "use strict";
    describe("handleKeyNav", function () {
        it("calls this.focusLeft when key code is 37", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusLeft = function () {
                done();
            };
            nav.handleKeyNav({
                keyCode: 37,
                preventDefault: function () {}
            });
        });
        it("calls this.focusUp when key code is 38", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusUp = function () {
                done();
            };
            nav.handleKeyNav({
                keyCode: 38,
                preventDefault: function () {}
            });
        });
        it("calls this.focusRight when key code is 39", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusRight = function () {
                done();
            };
            nav.handleKeyNav({
                keyCode: 39,
                preventDefault: function () {}
            });
        });
        it("calls this.focusDown when key code is 40", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusDown = function () {
                done();
            };
            nav.handleKeyNav({
                keyCode: 40,
                preventDefault: function () {}
            });
        });
        it("calls event.preventDefault when key code is 38", function (done) {
            nav = Object.create(KeyboardNavigator);
            nav.focusUp = function () {};
            nav.handleKeyNav({
                keyCode: 38,
                preventDefault: function () {
                    done();
                }
            });
        });
        it("calls event.preventDefault when key code is 40", function (done) {
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
    describe("focusIfEditableCell", function () {
        it("returns true if cell exists and is editable", function () {
            var template = require("../../test-utils/templates/rendered-board.hbs"),
                nav = Object.create(KeyboardNavigator);
            $("#content").html(template());
            expect(nav.focusIfEditableCell(0,2)).to.be.true;
        });
        it("returns false if cell is not editable", function () {
            var template = require("../../test-utils/templates/rendered-board.hbs"),
                nav = Object.create(KeyboardNavigator);
            $("#content").html(template());
            expect(nav.focusIfEditableCell(0,0)).to.be.false;
        });
        it("returns false if cell does not exist", function () {
            var template = require("../../test-utils/templates/rendered-board.hbs"),
                nav = Object.create(KeyboardNavigator);
            $("#content").html(template());
            expect(nav.focusIfEditableCell(0,9)).to.be.false;
        });
    });
    describe("focusDown", function () {
        it("calls this.focusIfEditableCell(row + 1, column)", function (done) {
            var nav = Object.create(KeyboardNavigator);
            nav.focusIfEditableCell = function (row, column) {
                expect(row).to.equal(3);
                expect(column).to.equal(4);
                done();
                return true;
            };
            nav.focusDown(2,4);
        });
    });
    describe("focusUp", function () {
        it("calls this.focusIfEditableCell(row - 1, column)", function (done) {
            var nav = Object.create(KeyboardNavigator);
            nav.focusIfEditableCell = function (row, column) {
                expect(row).to.equal(1);
                expect(column).to.equal(4);
                done();
                return true;
            };
            nav.focusUp(2,4);
        });
    });
    describe("focusLeft", function () {
        it("calls this.focusIfEditableCell(row, column - 1)", function (done) {
            var nav = Object.create(KeyboardNavigator);
            nav.focusIfEditableCell = function (row, column) {
                expect(row).to.equal(2);
                expect(column).to.equal(3);
                done();
                return true;
            };
            nav.focusLeft(2,4);
        });
    });
    describe("focusRight", function () {
        it("calls this.focusIfEditableCell(row, column - 1)", function (done) {
            var nav = Object.create(KeyboardNavigator);
            nav.focusIfEditableCell = function (row, column) {
                expect(row).to.equal(2);
                expect(column).to.equal(5);
                done();
                return true;
            };
            nav.focusRight(2,4);
        });
    });
});
