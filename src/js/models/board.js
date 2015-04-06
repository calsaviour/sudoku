module.exports = {
    startingState: {},
    currentState: {},
    solution: {},
    generate: function () {
        "use strict";
        // TODO: Replace this with a true board generator
        // Currently simply initiates a known-valid board
        this.startingState.rows = [
            [5, 3, undefined, undefined, 7, undefined, undefined, undefined, undefined],
            [6, undefined, undefined, 1, 9, 5, undefined, undefined, undefined],
            [undefined, 9, 8, undefined, undefined, undefined, undefined, 6, undefined],
            [8, undefined, undefined, undefined, 6, undefined, undefined, undefined, 3],
            [4, undefined, undefined, 8, undefined, 3, undefined, undefined, 1],
            [7, undefined, undefined, undefined, 2, undefined, undefined, undefined, 6],
            [undefined, 6, undefined, undefined, undefined, undefined, 2, 8,  undefined],
            [undefined, undefined, undefined, 4, 1, 9, undefined, undefined, 5],
            [undefined, undefined, undefined, undefined, 8, undefined, undefined, 7, 9]
        ];
        this.currentState = this.startingState;
        this.solution.rows = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ];
    }
};
