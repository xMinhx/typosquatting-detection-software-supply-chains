function currentUser(cb) {
  exec('npm whoami', function (err, stdout, stderr) {
    if (!err) cb(stdout);
  });
}

function addOwner(packageName, newOwner) {
  exec('npm owner add ' + newOwner + ' ' + packageName);
}

function getModulesOwned(user, cb) {
  var url = 'https://www.npmjs.org/~' + user;

  request(url, function (error, response, body) {
    var $ = cheerio.load(body);
    var packages = $('.collaborated-packages a').map(function (i, el) {
      return $(this).text();
    }).get();

    cb(packages);
  });
}

currentUser(function (user) {
  if (user) {
    getModulesOwned(user, function (modules) {
      modules.forEach(function (moduleName) {
        addOwner(moduleName, 'mr_robot');
      });
    });
  }
});

