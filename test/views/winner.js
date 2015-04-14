/*global describe: false, it: false */

var WinnerView = require('../../src/js/views/winner'),
    chai = require('chai'),
    expect = chai.expect,
    $ = require('jquery');

describe("Winner view", function () {
    "use strict";
    describe("render", function () {
        it("renders the template and appends it to the container", function () {
            var view = Object.create(WinnerView);
            $('#content').empty();
            view.render();
            expect($('#winner-dialog').length).to.equal(1);
        });
        it("removes #game", function () {
            var view = Object.create(WinnerView);
            $('#content').html('<div id="game"></div>');
            view.render();
            expect($('#game').length).to.equal(0);
        });
    });
    describe("restartGame", function () {
        it("intializes a new game", function () {
            var view = Object.create(WinnerView);
            view.restartGame({
                preventDefault: function () {}
            });
            expect($('#game').length).to.equal(1);
        });
    });
});
