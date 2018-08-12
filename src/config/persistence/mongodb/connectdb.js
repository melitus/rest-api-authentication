import mongoose from 'mongoose';

const config = require('../../config');

let gracefulShutdown;
let db = `${config.get('mongo.host')}/${config.get('mongo.database')}`;

mongoose.Promise = global.Promise;
// Connecting to Database
 mongoose.connect(db, { useNewUrlParser: true });

// Checking if connection to db was successful
mongoose.connection.on('connected', () => {
    console.log('Mongoose successfully connected to database URL: '+db);
});

mongoose.connection.on('error', (err) => {
    console.error("Mongoose connection error occurred. Error: " + err);
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose connection lost...");
});
//
// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app termination', function () {
        process.exit(0);
    });
});

export default mongoose;


