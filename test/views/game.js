var GameView = require('../../src/js/views/game'),
    chai = require('chai'),
    expect = chai.expect,
    $ = require('jquery');

describe("Game view", function () {
    "use strict";
    describe("render", function () {
        it("creates a game div inside #content", function () {
            var game = Object.create(GameView);
            game.render();
            expect($('#content div#game').length).to.equal(1);
        });
        it("generates a board", function () {
            var game = Object.create(GameView);
            game.render();
            expect(game.board.solution.rows).to.be.instanceof(Array);
            expect(game.board.currentState.rows).to.be.instanceof(Array);
            expect(game.board.startingState.rows).to.be.instanceof(Array);
        });
        it("calls renderRows", function (done) {
            var game = Object.create(GameView);
            game.renderRows = done;
            game.render();
        });
    });
    describe("renderRows", function () {
        it ("renders the game board's starting state", function () {
            var game = Object.create(GameView);
            $('#content').html('<div id="game"></div>');
            game.board = {
                startingState: {
                    rows: [
                        ['this', 'is', 'a'],
                        ['test', 'of', 'the'],
                        ['emergency', 'broadcast', 'system']
                    ]
                }
            };
            game.renderRows();
            expect($('#game .row').length).to.equal(3);
            expect($('#game .row .cell').length).to.equal(9);
            expect($('#game .row .cell').first().val()).to.equal('this');
            expect($('#game .row .cell').last().val()).to.equal('system');
        });
    });
});
