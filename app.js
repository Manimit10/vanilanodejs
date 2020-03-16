// main core modules of node js

// 1- http & https -> creating server and work with http request and responses
// fs -> file system
// path -> constructing path to file whch work in all operating system
// os -> working with operating system

// now we want to use http in core nodejs
const http = require('http');

const routs = require('./routs');

const server = http.createServer(routs);

server.listen(3000);