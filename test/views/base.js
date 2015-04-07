var BaseView = require('../../src/js/views/base'),
    chai = require('chai'),
    should = require('should'),
    expect = chai.expect,
    $ = require('jquery');

describe("Base view", function () {
    "use strict";
    describe("initialize", function () {
        it("extends the object using provided options", function () {
            var view = Object.create(BaseView);
            view.initialize({
                foo: 'bar'
            });
            expect(view.foo).to.equal('bar');
            expect(view.initialize).to.exist;
        });
        it("has no effect when called without options", function () {
            var view = Object.create(BaseView);
            view.initialize();
            expect(view).to.deep.equal(Object.create(BaseView));
        });
        it("should call delegateEvents", function (done) {
            var view = Object.create(BaseView);
            view.initialize({
                delegateEvents: function () {
                    done();
                }
            });
        });
    });
    describe("delegateEvents", function () {
        it("should delegate events specified by the events object", function (done) {
            var view = Object.create(BaseView);
            $('#content').html('<div id="test-el"></div>');
            view.initialize({
                el: '#test-el',
                events: {
                    'testEvent': 'handleEvent'
                },
                handleEvent: function () {
                    $('#content').empty();
                    done();
                }
            });
            $('#test-el').trigger('testEvent');
        });
        it("should only listen to events triggered from view.el or children", function (done) {
            var view = Object.create(BaseView);
            $('#content').html('<div id="test-el"></div>');
            view.initialize({
                el: '#test-el',
                events: {
                    'testEvent': 'handleEvent'
                },
                handleEvent: function () {
                    should.fail(
                        'Event handler was hit',
                        'Event handler not hot',
                        'Event handler was hit when it should not have been'
                        );
                }
            });
            $('#content').after('<div id="outside-scope"></div>');
            $('#outside-scope').trigger('testEvent');
            setTimeout(function () {
                $('#content').empty();
                done();
            }, 100);
        });
    });
});
