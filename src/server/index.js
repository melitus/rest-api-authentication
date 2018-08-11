import config from '../config/config';
import app from '../config/express';

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// open mongoose connection
require('../config/persistence/mongodb/connectdb');

// listen to requests
app.listen( () => console.info(`server started on port ${config.get('server.port')} (${config.get('env')})`));

/**
* Exports express
* @public
*/
module.exports = app;
