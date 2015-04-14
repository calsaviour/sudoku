/*global describe: false, it: false */

var CellView = require('../../src/js/views/cell'),
    chai = require('chai'),
    expect = chai.expect,
    mockBoard = require('../../test-utils/mocks/board'),
    $ = require('jquery');

describe("Cell view", function () {
    "use strict";
    describe("initialize", function () {
        it("sets the container and startingValue properties", function () {
            var view = Object.create(CellView);
            $('#content').html('<div id="test-el"></div>');
            view.initialize({
                container: $('#test-el'),
                startingValue: 5,
                board: mockBoard
            });
            expect(view.startingValue).to.equal(5);
            expect(view.container).to.deep.equal($("#test-el"));
            $('#content').empty();
        });
    });
    describe("render", function () {
        it("renders the template and appends it to the container", function () {
            var view = Object.create(CellView);
            $('#content').html('<div id="test-el"></div>');
            view.initialize({
                container: $('#test-el'),
                startingValue: 9,
                board: mockBoard
            });
            view.render();
            expect($('#test-el .cell').length).to.equal(1);
            expect($('#test-el .cell').first().val()).to.equal("9");
            $('#content').empty();
        });
    });
});
