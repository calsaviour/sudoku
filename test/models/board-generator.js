var BoardGenerator = require('../../src/js/models/board-generator'),
    Board = require('../../src/js/models/board'),
    _ = require('underscore'),
    clone = require('clone'),
    chai = require('chai'),
    should = require('should'),
    expect = chai.expect;
/*global describe: false, it: false */

describe("Board generator", function () {
    "use strict";
    describe("flipX", function () {
        it("reverses each row of the solution array", function () {
            var generator = Object.create(BoardGenerator);
            generator.solution = [[1, 2], [3, 4]];
            generator.flipX();
            expect(generator.solution).to.deep.equal([[2, 1], [4, 3]]);
        });
    });
    describe("flipY", function () {
        it("reverses the solution array", function () {
            var generator = Object.create(BoardGenerator);
            generator.solution = [[1, 2], [3, 4]];
            generator.flipY();
            expect(generator.solution).to.deep.equal([[3, 4], [1, 2]]);
        });
    });
    describe("transpose", function () {
        it ("does an transposes the solution array", function () {
            var generator = Object.create(BoardGenerator);
            generator.solution = [[1, 2], [3, 4]];
            generator.transpose();
            expect(generator.solution).to.deep.equal([[1, 3], [2, 4]]);
        });
    });
    describe("shuffleRows", function () {
        it("changes order of rows", function () {
            var generator = Object.create(BoardGenerator),
                original = clone(generator.solution),
                i,
                maxAttempts = 10;
            for (i = 0; i < maxAttempts; i++) {
                generator.shuffleRows();
                if (JSON.stringify(generator.solution) !== JSON.stringify(original)) {
                    break;
                }
            }
            expect(JSON.stringify(generator.solution)).not.to.equal(JSON.stringify(original));
            expect(generator.solution.sort()).to.deep.equal(original.sort());
        });
    });
    describe("shuffle", function () {
        it("calls this.shuffleRows", function (done) {
            var generator = Object.create(BoardGenerator);
                generator.shuffleReps = 1;
            generator.shuffleRows = function () {
                done();
            };
            generator.shuffle();
        });
        it("flips along the X axis if selected randomly", function (done) {
            var generator = Object.create(BoardGenerator);
                generator.shuffleReps = 1;
            generator.flipY = function () {
                done();
            };
            generator.pFlip = 1;
            generator.shuffle();
        });
        it("flips along the Y axis if selected randomly", function (done) {
            var generator = Object.create(BoardGenerator);
                generator.shuffleReps = 1;
            generator.flipY = function () {
                done();
            };
            generator.pFlip = 1;
            generator.shuffle();
        });
        it("does not flip unless selected by random roll", function (done) {
            var generator = Object.create(BoardGenerator);
                generator.shuffleReps = 1;
            generator.flipY = function () {
                should.fail(
                    'generator flipped on Y axis',
                    'generator does not flip on Y axis',
                    'generator flipped on Y axis when not selected to'
                );
            };
            generator.flipX = function () {
                should.fail(
                    'generator flipped on X axis',
                    'generator does not flip on X axis',
                    'generator flipped on X axis when not selected to'
                );
            };
            generator.pFlip = 0;
            generator.shuffle();
            setTimeout(function () {
                done();
            }, 100);
        });
        it("generates a solution that passes board validation and completeness checks", function () {
            var generator = Object.create(BoardGenerator),
                board = Object.create(Board);
            generator.shuffle();
            board.currentState = {
                rows: generator.solution
            };
            expect(board.validate()).to.be.true;
        });
    });
    describe("filterSolution", function () {
        it("deletes cells randomly according to pDelete", function () {
            var generator = Object.create(BoardGenerator);
            generator.solution = [[1, 2], [3, 4]];
            generator.pDelete = 1;
            generator.isMaxFiltered = function () {
                return false;
            };
            generator.filterSolution();
            expect(generator.board).to.deep.equal([[undefined, undefined], [undefined, undefined]]);
            generator = Object.create(BoardGenerator);
            generator.solution = [[1, 2, 3], [4, 5, 6]];
            generator.isMaxFiltered = function () {
                return false;
            };
            generator.pDelete = 0;
            generator.filterSolution();
            expect(generator.board).to.deep.equal([[1, 2, 3], [4, 5, 6]]);
        });
        it("returns if board is past max filter threshold", function () {
            var generator = Object.create(BoardGenerator);
            generator.solution = [[1, 2], [3, 4]];
            generator.pDelete = 1;
            generator.filterSolution();
            expect(generator.board).to.deep.equal([[1, 2], [3, 4]]);
        });
        it("returns this.board", function () {
            var generator = Object.create(BoardGenerator),
                returned;
            generator.board = [[1, 2, 3], [4, 5, 6]];
            returned = generator.filterSolution();
            expect(returned).to.deep.equal(generator.board);
        });
    });
    describe("isMaxFiltered", function () {
        it("returns false if there are 18 or more defined cells and 9 or more unique values", function () {
            var generator = Object.create(BoardGenerator);
            generator.board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            expect(generator.isMaxFiltered()).to.be.false;
        });
        it("returns true if there are fewer than 18 defined cells", function () {
            var generator = Object.create(BoardGenerator);
            generator.board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8];
            expect(generator.isMaxFiltered()).to.be.true;
        });
        it("returns true if there are fewer than 9 unique values", function () {
            var generator = Object.create(BoardGenerator);
            generator.board = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
            expect(generator.isMaxFiltered()).to.be.true;
        });
    });
    describe("generate", function () {
        it("calls this.shuffle", function (done) {
            var generator = Object.create(BoardGenerator);
            generator.shuffle = function () {
                done();
            };
            generator.generate();
        });
        it("returns the result of this.filterSolution", function () {
            var generator = Object.create(BoardGenerator);
            generator.filterSolution = function () {
                return "filtered";
            };
            expect(generator.generate()).to.equal("filtered");
        });
    });
});
