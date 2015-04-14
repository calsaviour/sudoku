var _ = require('underscore'),
    clone = require('clone');
module.exports = {
    pFlip: 0.5,
    pDelete: 0.5,
    solution: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ],
    flipX: function () {
        "use strict";
        var i;
        for (i = 0; i < this.solution.length; i++) {
            this.solution[i].reverse();
        }
    },
    flipY: function () {
        "use strict";
        this.solution.reverse();
    },
    shuffleRows: function () {
        "use strict";
        var sections = [
                this.solution.slice(0, 3),
                this.solution.slice(3, 6),
                this.solution.slice(6, 9)
            ];
        sections = _.shuffle(sections);
        this.solution = sections[0].concat(sections[1], sections[2]);
    },
    shuffle: function () {
        "use strict";
        if (Math.random() <= this.pFlip) {
            this.flipX();
        }
        if (Math.random() <= this.pFlip) {
            this.flipY();
        }
        this.shuffleRows();
    },
    filterSolution: function () {
        "use strict";
        var row,
            column;
        this.board = clone(this.solution);
        for (row = 0; row < this.board.length; row++) {
            for (column = 0; column < this.board[0].length; column++) {
                if (this.isMaxFiltered()) {
                    return this.board;
                }
                if (Math.random() < this.pDelete) {
                    this.board[row][column] = undefined;
                }
            }
        }
        return this.board;
    },
    isMaxFiltered: function () {
        "use strict";
        var definedCells = _.compact(_.flatten(this.board)),
            unique = _.unique(definedCells);
        if (definedCells.length < 18 || unique.length < 9) {
            return true;
        }
        return false;
    },
    generate: function () {
        "use strict";
        this.shuffle();
        return this.filterSolution();
    }
};
