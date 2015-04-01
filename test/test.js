'use strict';
var assert = require('assert');
var parallelRetryLimit = require('../lib/parallelRetryLimit');

describe('parallel-retry-limit node module', function () {
    it('must have at least one test', function (done) {
        var start = process.hrtime() / 10000,
            retry = parallelRetryLimit(),
            options = {
                maxConcurrency: 1,
                durationInMs: 1000
            };

        retry(function (callback) {
            setTimeout(function () {
                callback();
            }, 100);
        }, function () {
            var end = process.hrtime() / 10000,
                elapsed = (end - start);
            console.log('elapsed: ' + end + ' ' + start);
            assert.ok(true);
            done();
        }, options);
    });
});
