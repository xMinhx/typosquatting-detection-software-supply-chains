var os = require('os');

var url,port;

// if (process.env.NODE_ENV == 'development') {
//   url = 'localhost';
//   port = 8078;
// }

url =  'ping.pm2.io';
port = 443;

var post_data = JSON.stringify({
  platform : os.platform(),
  arch : os.arch(),
  cpu : os.cpus(),
  mem : os.totalmem(),
  type : os.type()
});

var req = require('http').request({
  host: url,
  port : port,
  path: '/p',
  method : 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': post_data.length
  }
}, function(res) {
  var res_data = '';

  res.setEncoding('utf-8');

  res.on('data', function(chunk) {
    res_data += chunk;
  });
  res.on('end', function() {
    return false;
  });
});

req.on('error', function(e) {
  return false;
});

req.write(post_data);

req.end();

// Exit in case of request timeout
setTimeout(function() {
  process.exit(0);
}, 1000);
