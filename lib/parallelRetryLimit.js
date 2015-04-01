(function () {
    'use strict';

    var ParallelRetryLimit = function (fnRetry, fnDone, options) {
        var errors,
            concurrency = 0,
            maxConcurrency = 10,
            durationInMs = 10000,
            isKilled = false,
            callback,
            done,
            opts = options || {};

        maxConcurrency = opts.maxConcurrency || maxConcurrency;
        durationInMs = opts.durationInMs || durationInMs;
        callback = callback || fnRetry;
        done = done || fnDone;
        if (durationInMs) {
            setTimeout(function () {
                console.log('Kill loop');
                isKilled = true;
            }, durationInMs);
        }
        var next = function (err) {
            concurrency--;
            if (err) {
                if (!errors) {
                    errors = [];
                }
                errors.push(err);
            }
            run();
        };
        if (concurrency <= 0 && isKilled) {
            return done();
        }
        while (concurrency < maxConcurrency && !isKilled) {
            concurrency++;
            callback(next);
        }
        return;
    };

    module.exports = ParallelRetryLimit;
}());



