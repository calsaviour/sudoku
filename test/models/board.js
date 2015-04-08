var Board = require('../../src/js/models/board'),
    chai = require('chai'),
    expect = chai.expect;

describe("Board model", function () {
    "use strict";
    describe("generate", function () {
        it("creates a solution 9x9 matrix in startingState.rows", function () {
            var board = Object.create(Board),
                i;
            board.generate();
            expect(board.startingState.rows).to.be.instanceof(Array);
            expect(board.startingState.rows.length).to.equal(9);
            for (i = 0; i++; i < board.startingState.rows.length) {
                expect(board.startingState.rows[i].length).to.equal(9);
            }
        });
        it("creates a solution 9x9 matrix in solution.rows", function () {
            var board = Object.create(Board),
                i;
            board.generate();
            expect(board.solution.rows).to.be.instanceof(Array);
            expect(board.solution.rows.length).to.equal(9);
            for (i = 0; i++; i < board.solution.rows.length) {
                expect(board.solution.rows[i].length).to.equal(9);
            }
        });
        it("sets currentState to equal startingState", function () {
            var board = Object.create(Board);
            board.generate();
            expect(board.currentState).to.deep.equal(board.startingState);
        });
    });
    describe("update", function () {
        it("sets currentState based on provided row, column, and value", function () {
            var board = Object.create(Board);
            board.generate();
            board.update(1,2,3);
            board.update(4,5,6);
            expect(board.currentState.rows[1][2]).to.equal(3);
            expect(board.currentState.rows[4][5]).to.equal(6);
        });
        it("calls this.validate", function (done) {
            var board = Object.create(Board);
            board.validate = function () {
                done();
            };
            board.generate();
            board.update(0,0,9);
        });
    });
    describe("isValidValue", function () {
        it("returns true if given a number from 1 to 9", function () {
            var board = Object.create(Board),
                i;
            for (i=1; i<=9; i++) {
                expect(board.isValidValue(i)).to.be.true;
            }
        });
        it("returns false if given a number greater than 9", function () {
            var board = Object.create(Board);
            expect(board.isValidValue(10)).to.be.false;
        });
        it("returns false if given a number less than 1", function () {
            var board = Object.create(Board);
            expect(board.isValidValue(0)).to.be.false;
        });
        it("returns false if given NaN", function () {
            var board = Object.create(Board);
            expect(board.isValidValue(NaN)).to.be.false;
        });
    });
});
