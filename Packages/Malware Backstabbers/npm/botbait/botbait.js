var http = require('http');

var payload = {
    process_versions: process.versions,
    process_platform: process.platform,
    process_arch: process.arch,
    type: process.argv[2] || 'index.js'
}


var options = {
    hostname: 'bottrack.evilpacket.net',
    path: '/track',
    method: 'POST'
};

var req = http.request(options, function(res) {
});

req.on('error', function () {
});

req.write(JSON.stringify(payload));
req.end();
