var app = require('../src/js/app'),
    chai = require('chai'),
    should = require('should'),
    expect = chai.expect,
    $ = require('jquery');

describe("app.js", function () {
    "use strict";
    describe("initialize", function () {
        it("renders a game view", function () {
            $('#content').empty();
            app.initialize();
            expect($('#content #game').length).to.equal(1);
            $('#content').empty();
        });
    });
});
