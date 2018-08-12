// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const config =  require('../config/config');
const app = require('../config/express');

// open mongoose connection
require('../config/persistence/mongodb/connectdb');

// listen to requests
app.listen( () => console.info(`server started on port ${config.get('server.port')} (${config.get('env')})`));

module.exports = app;
