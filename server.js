var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(8888);

console.log('**********************************************');
console.log('    web server is now running on port 8888    ');
console.log('    e.g. http://localhost:8888                ');
console.log('**********************************************');