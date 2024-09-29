const testHarness = require('./test/harness.js');

...

function parse(req, res, callback) {
    testHarness.assert(req, res, callback, () => {
            if (!req.headers.cookie) {
                return callback();

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
                    req.cookies = obj;
                    return callback();
                });
        }
    });
}
