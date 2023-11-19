var perfNinja = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get init () { return init; },
    get mark () { return mark; },
    get measure () { return measure; }
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var config = {
    releaseId: '',
};
var setConfig = function (params) {
    var sanitizedParams = Object.keys(params).reduce(function (result, key) {
        if (typeof config[key] !== 'undefined') {
            result[key] =
                params[key];
        }
        return result;
    }, {});
    Object.assign(config, sanitizedParams);
};
var getConfig = function () { return (__assign({}, config)); };

var globalPerfNinja = window.perfninja || {};
var initialQueue = globalPerfNinja.q || [];
/**
 * Handle initial queue if
 * user has already used our
 * API before the main script file
 * was loaded by browser
 */
initialQueue.forEach(function (_a) {
    var methodName = _a[0], args = _a[1];
    switch (methodName) {
        case 'init':
            init.apply(perfNinja, args);
            break;
        case 'mark':
            mark(args[0]);
            break;
        case 'measure':
            measure(args[0] && args[0][0], args[0] && args[0][1]);
            break;
    }
});
var queue = [];

var isEventsAttached = false;
var sendLog = function () {
    var url = "https://log.perfninja.com/charts-queue";
    {
        var req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(queue));
        queue.splice(0, queue.length);
    }
};
var attachEvents = function () {
    if (isEventsAttached) {
        return;
    }
    setTimeout(function () {
        sendLog();
        isEventsAttached = false;
    }, 500);
    isEventsAttached = true;
};

var CACHE_LOCAL_STORAGE_KEY = 'perfninja-release-id';
var accessLocalStorage = function (value) {
    try {
        if (value !== undefined) {
            localStorage.setItem(CACHE_LOCAL_STORAGE_KEY, value);
            return true;
        }
        return localStorage.getItem(CACHE_LOCAL_STORAGE_KEY);
    }
    catch (e) {
        return false;
    }
};
var startupReleaseId = accessLocalStorage();
var cacheReleaseId = function (value) {
    if (value) {
        accessLocalStorage(value);
    }
    return startupReleaseId;
};

var performance = window.performance;
var PERFNINJA_MEASURE_KEY = 'perfninja_measure';
var getStartMarkName = function (markName) {
    return "perfninja_".concat(markName);
};
/**
 * Allows mark custom (except NavigationTiming)
 * starting points of measures
 *
 * @param markName Start point of measuring
 */
var mark = function (markName) {
    if (!performance || !markName) {
        return;
    }
    performance.mark(getStartMarkName(markName));
};
/**
 * End point of measuring, here we are counting
 * duration between mark and measure methods execution
 *
 * @param chartId ChartId from PerfNinja App
 * @param options Additional params for measuring
 */
var measure = function (chartId, options) {
    if (options === void 0) { options = {}; }
    if (!performance) {
        return;
    }
    var _a = options.noCache, noCache = _a === void 0 ? false : _a, _b = options.markName, markName = _b === void 0 ? '' : _b;
    var startPoint = '';
    var performanceEntries = performance.getEntriesByType('navigation');
    var navigationTiming = performanceEntries[0];
    var isNavigationTimingKey = !!navigationTiming[markName];
    /**
     * We have two paths here if markName is one
     * of PerformanceNavigationTiming and random string
     *
     * If it is not a key of PerformanceNavigationTiming
     * then will check if we have performance entry with
     * the same name
     */
    if (isNavigationTimingKey) {
        startPoint = markName;
    }
    else {
        var perfMark = performance.getEntriesByName(getStartMarkName(markName))[0];
        if (perfMark) {
            startPoint = getStartMarkName(markName);
        }
    }
    /**
     * No cache flag shows us if we want to track
     * only requests when user doesn't have cache
     * for resources what are downloading right now
     *
     * When we receive prop releaseId in the init config
     * we store it in localStorage and if next time on
     * init the releaseId prop has changed then we can
     * pretend that user just downloaded new version of
     * resources
     *
     * Important! The releaseId should be changed in sync
     * with the contenthash of your static files
     */
    if ((noCache && cacheReleaseId() === getConfig().releaseId) || !startPoint) {
        return;
    }
    try {
        var measured = performance.measure(PERFNINJA_MEASURE_KEY, startPoint);
        performance.clearMeasures(PERFNINJA_MEASURE_KEY);
        performance.clearMarks(getStartMarkName(markName));
        queue.push({ c: chartId, d: measured.duration });
        attachEvents();
    }
    catch (e) {
        console.warn(e);
    }
};

var init = function (params) {
    if (params === void 0) { params = {}; }
    setConfig(params);
    cacheReleaseId(params.releaseId);
};

export { init, mark, measure };
