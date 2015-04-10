var _ = require('underscore'),
    $ = require('jquery');

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
        this.currentState = _.clone(this.startingState);
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
    },
    update: function (row, column, value) {
        this.currentState.rows[row][column] = value;
        $(this).trigger("updated");
        this.validate();
    },
    validate: function () {
        var rowsAreValid = this.validateRows(),
            columnsAreValid = this.validateColumns(),
            regionsAreValid = this.validateRegions();

        if (rowsAreValid && columnsAreValid && regionsAreValid && this.isComplete()) {
            $(this).trigger("wonGame");
        }
    },
    validateRows: function () {
        var i,
            j,
            row,
            isValid = true;
        for (i = 0; i < this.currentState.rows.length; i++) {
            row = this.currentState.rows[i];
            for (j = 0; j < row.length; j++) {
                if (row[j] !== undefined && _.indexOf(row, row[j], j + 1) > -1) {
                    $(this).trigger('invalidRow', i);
                    isValid = false;
                    break;
                }
            }
        }
        return isValid;
    },
    validateColumns: function () {
        var i,
            j,
            column,
            value,
            isValid = true;
        for (i = 0; i < this.currentState.rows[0].length; i++) {
            column = [];
            for (j = 0; j < this.currentState.rows.length; j++) {
                value = this.currentState.rows[j][i];
                if (value !== undefined && column.indexOf(value) > -1) {
                    $(this).trigger('invalidColumn', i);
                    isValid = false;
                    break;
                }
                column.push(this.currentState.rows[j][i]);
            }
        }
        return isValid;
    },
    validateRegions: function () {
        var isValid = true,
            nRegions = 9,
            i;
        for (i = 0; i < nRegions; i++) {
            if (!this.validateRegion(i)) {
                isValid = false;
            }
        }
        return isValid;
    },
    validateRegion: function (region) {
        var regionEdgeSize = 3,
            left = (region % regionEdgeSize) * regionEdgeSize,
            top = Math.floor(region / regionEdgeSize) * regionEdgeSize,
            row,
            column,
            values = [],
            value,
            isValid = true;
        for (column = left; column < left + regionEdgeSize; column++ ) {
            for (row = top; row < top + regionEdgeSize; row++) {
                value = this.currentState.rows[row][column];
                if (value !== undefined && values.indexOf(value) > -1) {
                    isValid = false;
                    $(this).trigger('invalidRegion', region);
                    break;
                }
                values.push(value);
            }
        }
        return isValid;
    },
    getRegion: function (row, column) {
        var regionsPerRow = 3,
            regionRow = Math.floor(row / 3),
            regionColumn = Math.floor(column / 3),
            region = regionColumn + regionRow * regionsPerRow;
        return region;
    },
    isComplete: function () {
        var allCells = _.flatten(this.currentState.rows);
        if (allCells.indexOf(undefined) === -1) {
            return true;
        }
        return false;
    },
    isValidValue: function (value) {
        if (!isNaN(value) && value > 0 && value <= 9) {
            return true;
        }
        return false;
    }
};
