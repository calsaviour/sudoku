var _ = require('underscore'),
    $ = require('jquery'),
    BoardGenerator = require('./board-generator');

module.exports = {
    startingState: {},
    currentState: {},
    solution: {},
    generator: Object.create(BoardGenerator),
    generate: function () {
        "use strict";
        this.startingState.rows = this.generator.generate();
        this.currentState = _.clone(this.startingState);
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
            return true;
        }
        return false;
    },
    validateRows: function () {
        var i,
            j,
            row,
            isValid = true;
        for (i = 0; i < this.currentState.rows.length; i++) {
            row = this.currentState.rows[i];
            for (j = 0; j < row.length; j++) {
                if (!isNaN(row[j]) && _.indexOf(row, row[j], j + 1) > -1) {
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
                if (!isNaN(value) && column.indexOf(value) > -1) {
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
                if (!isNaN(value) && values.indexOf(value) > -1) {
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
