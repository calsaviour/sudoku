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
        it("should call delegateEvents if this.$el is set", function (done) {
            var view = Object.create(BaseView);
            view.initialize({
                $el: $('#content'),
                delegateEvents: function () {
                    done();
                }
            });
        });
        it("should not attempt to delegate events if no view is set", function (done) {
            var view = Object.create(BaseView);
            view.initialize({
                delegateEvents: function () {
                    should.fail(
                        'view.initialize called delegateEvents',
                        'view.initialize does not delegateEvents when view.$el is not set',
                        'view.initialize called delegateEvents when view.$el was not set'
                        );
                }
            });
            setTimeout(function () {
                $('#content').empty();
                done();
            }, 100);
        });
        it("should call setElement", function (done) {
            var view = Object.create(BaseView);
            view.initialize({
                setElement: function () {
                    done();
                }
            });
        });
    });
    describe("setElement", function () {
        it("does nothing if this.$el is already set", function () {
            var view = Object.create(BaseView);
            view.initialize({
                $el: $('#content')
            });
            expect(view.$el).to.deep.equal($("#content"));
        });
        it("sets this.$el if this.el is set", function () {
            var view = Object.create(BaseView);
            view.initialize({
                el: '#content'
            });
            expect(view.$el).to.deep.equal($("#content"));
        });
        it("does not set this.$el if this.el is not defined", function () {
            var view = Object.create(BaseView);
            view.initialize();
            expect(view.$el).to.deep.be.undefined;
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
