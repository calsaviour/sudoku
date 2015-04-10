var RowView = require('../../src/js/views/row'),
    chai = require('chai'),
    expect = chai.expect,
    mockBoard = require('../../test-utils/mocks/board'),
    $ = require('jquery');

describe("Row view", function () {
    "use strict";
    describe("initialize", function () {
        it("sets the cells property", function () {
            var view = Object.create(RowView);
            view.initialize({
                cells: ["test"],
                board: mockBoard
            });
            expect(view.cells).to.deep.equal(["test"]);
        });
    });
    describe("render", function () {
        it("calls renderCells", function (done) {
            var view = Object.create(RowView);
            $('#content').html('<div id="test-el"></div>');
            view.container = "#test-el";
            view.renderCells = function () {
                $('#content').empty();
                done();
            };
            view.render();
        });
        it("creates this.$el and renders template", function () {
            var view = Object.create(RowView);
            $('#content').html('<div id="test-el"></div>');
            view.container = "#test-el";
            view.cells = ["test"];
            view.board = mockBoard;
            view.render();
            expect(view.$el.hasClass('row')).to.be.true;
            $('#content').empty();
        });
        it("appends this.$el to container", function () {
            var view = Object.create(RowView);
            $('#content').html('<div id="test-el"><div class="sibling"></div></div>');
            view.container = "#test-el";
            view.cells = ["test"];
            view.board = mockBoard;
            view.render();
            expect($("#test-el .row").length).to.equal(1);
            expect($("#test-el .sibling").length).to.equal(1);
            expect($("#test-el .row").prev().hasClass('sibling')).to.be.true;
            $('#content').empty();
        });
    });
    describe("renderCells", function () {
        it("creates cell views that are appended in the  row", function () {
            var view = Object.create(RowView);
            $('#content').html('<div id="test-el"></div>');
            view.$el = $('#test-el');
            view.cells = [5, 6, undefined, 9, undefined, 3];
            view.board = mockBoard;
            view.renderCells();
            expect($('#test-el .cell').length).to.equal(6);
            expect($('#test-el .cell').first().val()).to.equal('5');
            expect($('#test-el .cell').last().val()).to.equal('3');
            $('#content').empty();
        });
    });
});
