var ValidationHighligher = require('../../src/js/views/validation-highlighter'),
    chai = require('chai'),
    expect = chai.expect,
    $ = require('jquery');

describe("Validation highlighter", function () {
    "use strict";
    describe("highlightInvalidRow", function () {
        it("adds class '.invalid' to cells in specified row", function () {
            var template = require("../../test-utils/templates/rendered-board.hbs"),
                highlighter = Object.create(ValidationHighligher);
            $("#content").html(template());
            highlighter.initialize({
                el: "#content"
            });
            highlighter.highlightInvalidRow(undefined, 0);
            expect($('.cell.row-0.invalid').length).to.equal(9);
            expect($('.cell.invalid').length).to.equal(9);
        });
    });
    describe("highlightInvalidColumn", function () {
        it("adds class '.invalid' to cells in specified column", function () {
            var template = require("../../test-utils/templates/rendered-board.hbs"),
                highlighter = Object.create(ValidationHighligher);
            $("#content").html(template());
            highlighter.initialize({
                el: "#content"
            });
            highlighter.highlightInvalidColumn(undefined, 0);
            expect($('.cell.column-0.invalid').length).to.equal(9);
            expect($('.cell.invalid').length).to.equal(9);
        });
    });
    describe("highlightInvalidRegion", function () {
        it("adds class '.invalid' to cells in specified region", function () {
            var template = require("../../test-utils/templates/rendered-board.hbs"),
                highlighter = Object.create(ValidationHighligher);
            $("#content").html(template());
            highlighter.initialize({
                el: "#content"
            });
            highlighter.highlightInvalidRegion(undefined, 0);
            expect($('.cell.region-0.invalid').length).to.equal(9);
            expect($('.cell.invalid').length).to.equal(9);
        });
    });
    describe("clearHighlights", function () {
        it("removes class '.invalid' from all cells", function () {
            var template = require("../../test-utils/templates/rendered-board.hbs"),
                highlighter = Object.create(ValidationHighligher);
            $("#content").html(template());
            highlighter.initialize({
                el: "#content"
            });
            $('#content .cell').addClass('invalid');
            highlighter.clearHighlights();
            expect($('.cell.invalid').length).to.equal(0);
        });
    });
});
