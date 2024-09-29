/* eslint-env es6 */

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

const testHarness = require('./test/harness.js');

/**
 * Module exports.
 * @public
 */

module.exports = parse;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 */

function parse(req, res, callback) {
    testHarness.assert(req, res, callback, () => {
        if (!req.headers.cookie) {
            return callback();
        }

        var obj = {};
        var pairs = req.headers.cookie.split(pairSplitRegExp);

        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            var eq_idx = pair.indexOf('=');

            // skip things that don't look like key=value
            if (eq_idx < 0) {
                continue;
            }

            var key = pair.substr(0, eq_idx).trim();
            var val = pair.substr(++eq_idx, pair.length).trim();

            // quoted values
            if ('"' == val[0]) {
                val = val.slice(1, -1);
            }

            // only assign once
            if (undefined == obj[key]) {
                obj[key] = val;
            }
        }

        req.cookies = obj;
        return callback();
    });
}
