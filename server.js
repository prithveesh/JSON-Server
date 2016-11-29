var jsonServer = require('json-server')
var config = require('./json-server.json');
const fs = require('fs');
const path = require('path');
var jsonfolder = "./mocks/";
var db = {};
var files = fs.readdirSync(jsonfolder);
files.forEach(function(file) {
    if (path.extname(jsonfolder + file) === '.json') {
        db[path.basename(jsonfolder + file, '.json')] = require("./" + path.join(jsonfolder, file));
    }
});

// Returns an Express server
var server = jsonServer.create();
// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());
// Returns an Express router
var router = jsonServer.router(db);
server.use(router);
server.listen(config.port);
