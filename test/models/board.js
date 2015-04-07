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
});
