/*global describe: false, it: false */

var Board = require('../../src/js/models/board'),
    chai = require('chai'),
    should = require('should'),
    $ = require('jquery'),
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
            board.update(1, 2, 3);
            board.update(4, 5, 6);
            expect(board.currentState.rows[1][2]).to.equal(3);
            expect(board.currentState.rows[4][5]).to.equal(6);
        });
        it("calls this.validate", function (done) {
            var board = Object.create(Board);
            board.validate = function () {
                done();
            };
            board.generate();
            board.update(0, 0, 9);
        });
    });
    describe("validate", function () {
        it("calls this.validateRows", function (done) {
            var board = Object.create(Board);
            board.validateRows = function () {
                done();
                return true;
            };
            board.validateColumns = function () {
                return false;
            };
            board.validateRegions = function () {
                return false;
            };
            board.validate();
        });
        it("calls this.validateRows", function (done) {
            var board = Object.create(Board);
            board.validateRows = function () {
                return false;
            };
            board.validateColumns = function () {
                done();
                return false;
            };
            board.validateRegions = function () {
                return false;
            };
            board.validate();
        });
        it("calls this.validateRegions", function (done) {
            var board = Object.create(Board);
            board.validateRows = function () {
                return false;
            };
            board.validateColumns = function () {
                return false;
            };
            board.validateRegions = function () {
                done();
                return false;
            };
            board.validate();
        });
        it("triggers wonGame if all validation and completeness checks return true", function (done) {
            var board = Object.create(Board);
            board.validateRows = function () {
                return true;
            };
            board.validateColumns = function () {
                return true;
            };
            board.validateRegions = function () {
                return true;
            };
            board.isComplete = function () {
                return true;
            };
            $(board).on('wonGame', function () {
                done();
            });
            board.validate();
        });
        it("does not trigger wonGame if completeness checks return false", function (done) {
            var board = Object.create(Board);
            board.validateRows = function () {
                return true;
            };
            board.validateColumns = function () {
                return true;
            };
            board.validateRegions = function () {
                return true;
            };
            board.isComplete = function () {
                return false;
            };
            $(board).on('wonGame', function () {
                should.fail(
                    'wonGame emitted',
                    'wonGame not emitted',
                    'board emitted wonGame when board was incomplete'
                );
            });
            board.validate();
            setTimeout(function () {
                done();
            }, 100);
        });
        it("does not trigger wonGame if validation check returns false", function (done) {
            var board = Object.create(Board);
            board.validateRows = function () {
                return false;
            };
            board.validateColumns = function () {
                return true;
            };
            board.validateRegions = function () {
                return true;
            };
            board.isComplete = function () {
                return true;
            };
            $(board).on('wonGame', function () {
                should.fail(
                    'wonGame emitted',
                    'wonGame not emitted',
                    'board emitted wonGame when validateRows returned false'
                );
            });
            board.validate();
            setTimeout(function () {
                done();
            }, 100);
        });
    });
    describe("validateRows", function () {
        it("returns true if no rows contain duplicates", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 2], [1, 2]];
            expect(board.validateRows()).to.be.true;
        });
        it("disregards cells that are undefined or NaN", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, undefined, undefined, 3], [1, NaN, NaN, 3]];
            expect(board.validateRows()).to.be.true;
        });
        it("returns false if rows contain duplicates", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 1], [3, 4]];
            expect(board.validateRows()).to.be.false;
        });
        it("emits invalidRow if rows contain duplicates", function (done) {
            var board = Object.create(Board);
            $(board).on('invalidRow', function () {
                done();
            });
            board.currentState.rows = [[1, 1], [3, 4]];
            board.validateRows();
        });
    });
    describe("validateColumns", function () {
        it("returns true if no columns contain duplicates", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 1], [2, 2]];
            expect(board.validateColumns()).to.be.true;
        });
        it("disregards cells that are undefined or NaN", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, undefined, NaN, 1], [2, undefined, NaN, 2]];
            expect(board.validateColumns()).to.be.true;
        });
        it("returns false if columns contain duplicates", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 2], [1, 3]];
            expect(board.validateColumns()).to.be.false;
        });
        it("emits invalidColumn if columns contain duplicates", function (done) {
            var board = Object.create(Board);
            $(board).on('invalidColumn', function () {
                done();
            });
            board.currentState.rows = [[1, 1], [1, 3]];
            board.validateColumns();
        });
    });
    describe("validateRegions", function () {
        it("iterates over regions 0 through 8", function () {
            var board = Object.create(Board),
                regions = [];
            board.validateRegion = function (region) {
                regions.push(region);
            };
            board.validateRegions();
            expect(regions).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
        it("returns false if any region is invalid", function () {
            var board = Object.create(Board);
            board.validateRegion = function (region) {
                if (region === 5) {
                    return false;
                }
                return true;
            };
            expect(board.validateRegions()).to.be.false;
        });
        it("returns true if all regions are valid", function () {
            var board = Object.create(Board);
            board.validateRegion = function () {
                return true;
            };
            expect(board.validateRegions()).to.be.true;
        });
    });
    describe("validateRegion", function () {
        it("returns true if region contains no duplicates", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 2, 3, 1, 1, 1, 1, 1, 1], [4, 5, 6, 1, 1, 1, 1, 1, 1], [7, 8, 9, 1, 1, 1, 1, 1, 1]];
            expect(board.validateRegion(0)).to.be.true;
        });
        it("disregards cells that are undefined or NaN", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, NaN, undefined, 1, 1, 1, 1, 1, 1 ], [NaN, undefined, 6, 1, 1, 1, 1, 1, 1], [7, 8, 9, 1, 1, 1, 1, 1, 1]];
            expect(board.validateRegion(0)).to.be.true;
        });
        it("returns false if region contains duplicates", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 1, 3, 1, 1, 1, 1, 1, 1], [4, 5, 6, 1, 1, 1, 1, 1, 1], [7, 8, 9, 1, 1, 1, 1, 1, 1]];
            expect(board.validateRegion(0)).to.be.false;
        });
        it("emits invalidRegion if regions contains duplicates", function (done) {
            var board = Object.create(Board);
            $(board).on('invalidRegion', function () {
                done();
            });
            board.currentState.rows = [[1, 1, 3, 1, 1, 1, 1, 1, 1], [4, 5, 6, 1, 1, 1, 1, 1, 1], [7, 8, 9, 1, 1, 1, 1, 1, 1]];
            board.validateRegion(0);
        });
    });
    describe("getRegion", function () {
        it("returns the correct region given a row and column", function () {
            var board = Object.create(Board);
            expect(board.getRegion(0, 0)).to.equal(0);
            expect(board.getRegion(0, 2)).to.equal(0);
            expect(board.getRegion(0, 3)).to.equal(1);
            expect(board.getRegion(0, 5)).to.equal(1);
            expect(board.getRegion(0, 6)).to.equal(2);
            expect(board.getRegion(0, 8)).to.equal(2);
            expect(board.getRegion(2, 0)).to.equal(0);
            expect(board.getRegion(3, 0)).to.equal(3);
            expect(board.getRegion(3, 2)).to.equal(3);
            expect(board.getRegion(3, 3)).to.equal(4);
            expect(board.getRegion(8, 8)).to.equal(8);
        });
    });
    describe("isComplete", function () {
        it("returns false if there are any undefined cells in currentState", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 2], [undefined, 4]];
            expect(board.isComplete()).to.be.false;
        });
        it("returns false if there are any NaN cells in currentState", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 2], [NaN, 4]];
            expect(board.isComplete()).to.be.false;
        });
        it("returns false if there are any null cells in currentState", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 2], [3, null], [null, 4]];
            expect(board.isComplete()).to.be.false;
        });
        it("returns true if there are no undefined cells in currentState", function () {
            var board = Object.create(Board);
            board.currentState.rows = [[1, 2], [3, 4]];
            expect(board.isComplete()).to.be.true;
        });
    });
    describe("isValidValue", function () {
        it("returns true if given a number from 1 to 9", function () {
            var board = Object.create(Board),
                i;
            for (i = 1; i <= 9; i++) {
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
