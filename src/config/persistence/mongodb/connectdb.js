import mongoose from 'mongoose';

const config = require('../../config');

let dbURI = 'mongodb://kayak:kayak@kayakcluster-shard-00-00-j61pv.mongodb.net:27017,kayakcluster-shard-00-01-j61pv.mongodb.net:27017,kayakcluster-shard-00-02-j61pv.mongodb.net:27017/kayak?ssl=true&replicaSet=KayakCluster-shard-0&authSource=admin';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
let gracefulShutdown;

// Connecting to Database
 mongoose.connect(`${config.get('mongo.host')}/${config.get('mongo.database')}`);

// Checking if connection to db was successful
mongoose.connection.on('connected', () => {
    console.log('Mongoose successfully connected to database URL: '+config.get('mongo.database'));
});

mongoose.connection.on('error', (err) => {
    console.error("Mongoose connection error occurred. Error: " + error);
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose connection lost...");
});

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


